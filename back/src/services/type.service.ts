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

  async delete(id: Prisma.TypeWhereUniqueInput): Promise<Type> {
    return this.prisma.type.delete({
      where: id,
    });
  }

  async updateType(params: {
    where: Prisma.TypeWhereUniqueInput;
    data: any;
  }): Promise<Type> {
    const { data, where } = params;
    return this.prisma.type.update({
      where: where,
      data
    });
  }

  async findAll(): Promise<Type[] | null> {
    return await this.prisma.type.findMany()
  }
}