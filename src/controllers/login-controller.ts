import { Request, Response } from 'express';
import { z } from 'zod';
import { AppError } from '@/services/AppError.js';
import { prisma } from '@/database/prisma.js';
import { compare } from 'bcrypt';
import { authConfig } from '@/services/auth.js';
import jwt from 'jsonwebtoken';

export class LoginController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      email: z.email(),
      password: z.string()
    });

    const { email, password } = bodySchema.parse(req.body);

    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      throw new AppError('Invalid email or password!', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Invalid email or password!', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = jwt.sign({ role: user.role ?? 'member' }, secret, {
      subject: user.id,
      expiresIn
    });

    const { password: hashedPassword, createdAt, updatedAt, id, ...userLogin } = user;

    return res.json({ token, userLogin });
  }
}
