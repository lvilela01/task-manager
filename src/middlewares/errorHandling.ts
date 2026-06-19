import { Response } from "express";
import { AppError } from "@/utils/AppError";
import { ZodError } from "zod";

export function errorHandling(
  error: unknown,
  response: Response
){
  if(error instanceof AppError){
    return response.status(error.statusCode).json({message: error.message})
  }

  if(error instanceof ZodError){
    return response.status(400).json({
      message: 'validation error',
      issues: error.format()
    })
  }
}
