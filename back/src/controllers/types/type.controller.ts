import { Body, Controller, Get, Post, Delete, Put, Param } from "@nestjs/common";
import { Type } from "@prisma/client";
import { TypeService } from "src/services/type.service";
@Controller('types')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Get()
  show(): Promise<Type[] | null> {
    return this.typeService.findAll()
  }

  @Post()
  create(@Body() data: Type): Promise<Type> {
    return this.typeService.create(data)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any): any {
    const updateData = this.typeService.updateType({
      where: { id: id },
      data: body
    })

    return updateData
  }

  @Delete(':id')
  deleteType(@Param('id') id: string): any {
    const updateData = this.typeService.delete({
      id
    })

    return updateData
  }
}