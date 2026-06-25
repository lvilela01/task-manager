import { Request, Response } from "express";

export class TeamMemberController{
  async create(req: Request, res: Response){
    return res.json('ok')
  }
}
