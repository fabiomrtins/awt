import { Injectable } from "@nestjs/common";
import { Type, Prisma } from "@prisma/client";
import { PrismaService } from "./prisma.service";

@Injectable()
export class TypeService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TypeCreateInput): Promise<Type> {
    return await this.prisma.type.create({
      data
    })
  }

  async findAll(): Promise<Type[] | null> {
    return await this.prisma.type.findMany()
  }
}