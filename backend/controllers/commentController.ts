import { Request, Response } from 'express';
import prisma from '../models/prismaClient'

export const addComment = async (req: Request, res: Response) => {
	const { text, postId, userId } = req.body;

	try {
		const newComment = await prisma.comment.create({
			data: { text, postId, userId }
		})

		res.status(200).json({ newComment })
	}
	catch (e) {
		console.error(e)
		res.status(500).json({ error: "Internal server error", message: e })
	}

}

export const updateComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { text } = req.body;

  try {
    const comment = await prisma.comment.update({
      where: {id},
      data: { text }
    })

    res.status(200).json({
      message: "comment updated successfully!",
      updatedPost: comment,
    })
  }
  catch (error) {
    console.log("error",error)
    res.status(500).json({
      message: "error updating post",
      error: error
    })
  }

}

export const deleteComment = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const post = await prisma.comment.delete({
      where: {id},
    })

    res.status(200).json({
      message: "comment deleted successfully!",
      deletedPost: post,
    })
  }
  catch (error) {
    console.log("error",error)
    res.status(500).json({
      message: "error deleting comment",
      error: error
    })
  }

}