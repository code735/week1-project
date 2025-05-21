import { NextFunction, Request, Response } from "express";
import prisma from "../models/prismaClient";
import { randomUUID } from "crypto";

const getUsers = async (req: Request, res: Response) => {
	try {
		const page = parseInt(req.query.page as string) || 1;
		const limit = parseInt(req.query.limit as string);

		if (!page || !limit) {
			const getAllUsers = async () => {
				const allUsers = await prisma.user.findMany({
					include: {
						posts: true
					}
				})

				return allUsers;
			}

			const usersWithPosts = await getAllUsers();

			// console.log("usersWithPosts", usersWithPosts)

			res.status(200).json({
				data: usersWithPosts,
				currentPage: 1,
				totalPages: 1
			})
		}
		else {
			const skip = (page - 1) * limit;
			const [users, total] = await Promise.all([
				prisma.user.findMany({
					skip,
					take: limit,
				}),
				prisma.user.count()
			]);

			const totalPages = Math.ceil(total / limit)

			res.status(200).json({
				data: users,
				currentPage: page,
				totalPages
			})
		}
	}
	catch (error) {
		console.log(error)
		res.status(500).json({ error: "Internal server error", message: error })
	}
}

const addUsers = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { name, email, password } = req.body;
		const userId = randomUUID()?.slice(0, 6);
		const createUser = await prisma.user.create({
			data: { id: userId, name, email, password }
		})

		res.status(200).json({ createUser })
	}
	catch (error) {
		console.error(error)
		next(error)
		// res.status(500).json({ error: "Internal server error", message: error })
	}
}

const updateUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { name, email, password } = req.body;

		const updatedUser = await prisma.user.update({
			where: { id },
			data: { name, email, password }
		})

		res.status(200).json(updatedUser)
	}
	catch (error) {
		console.error(error)
		res.status(500).json("Internal Server Error")
	}
}

const deleteUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const deletedUser = await prisma.user.delete({
			where: { id }
		})

		res.status(200).json(deletedUser)
	}
	catch (error) {
		res.status(500).json({ error: 'Failed to delete user' });
	}
	prisma.user.delete
}

export { getUsers, addUsers, updateUser, deleteUser };