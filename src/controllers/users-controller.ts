import { prisma } from '@/database/prisma';
import { AppError } from '@/services/AppError';
import { Request, Response } from 'express';
import { z } from 'zod';
import { hash } from 'bcrypt';

export class UsersController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string(),
      email: z.email(),
      password: z.string().min(6)
    });

    const { name, email, password } = bodySchema.parse(request.body);

    const verifyEmailExists = await prisma.user.findFirst({ where: { email } });

    if (verifyEmailExists) {
      throw new AppError('Email exists, please user other email!');
    }

    const hashedPassword = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      },
      select: { name: true, email: true }
    });

    return response.status(201).json({
      message: 'User created successfully!',
      user
    });
  }
}
