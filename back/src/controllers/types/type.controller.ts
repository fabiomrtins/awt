import { Body, Controller, Get, Post } from "@nestjs/common";
import { Type } from "@prisma/client";
import { TypeService } from "src/services/type.service";

@Controller('types')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Get()
  show(): Promise<Type[] | []> {
    return this.typeService.findAll()
  }

  @Post()
  create(@Body() data: Type): Promise<Type> {
    return this.typeService.create(data)
  }
}