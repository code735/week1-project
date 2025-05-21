import { Request, Response } from 'express';
import prisma from '../models/prismaClient'

export const addPost = async (req: Request, res: Response) => {
  const { caption, type, content, likes, authorId } = req.body;

  try {
    const newPost = await prisma.post.create({
      data: { caption, type, content, likes, authorId }
    })

    res.status(200).json({ message: "Post created successfully", post: newPost })
  }
  catch (err) {
    res.status(500).json({ error: "Internal Server error", message: err })
  }
}

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { caption, type, content } = req.body;

  try {
    const post = await prisma.post.update({
      where: {id},
      data: { caption, type, content }
    })

    res.status(200).json({
      message: "Post updated successfully!",
      updatedPost: post,
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

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const post = await prisma.post.delete({
      where: {id},
    })

    res.status(200).json({
      message: "Post deleted successfully!",
      deletedPost: post,
    })
  }
  catch (error) {
    console.log("error",error)
    res.status(500).json({
      message: "error deleting post",
      error: error
    })
  }

}