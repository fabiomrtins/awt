import { Body, Controller, Get, Post } from '@nestjs/common';
import { Trainer as TrainerModel } from '@prisma/client';
import { TrainerService } from 'src/services/trainer.service';

@Controller('users')
export class UserController {
  constructor(private readonly trainerService: TrainerService) {}

  @Get()
  findAll(): Promise<TrainerModel[] | []> {
    const users: Promise<TrainerModel[] | []> = this.trainerService.findAll();

    return users;
  }

  @Post("login")
  login(@Body() body: any): Promise<TrainerModel[]> {
    const userData: Promise<TrainerModel[]> = this.trainerService.trainers({
      where: {
        email: body.email
      }
    })

    return userData
  }

  @Post()
  create(@Body() body: TrainerModel): Promise<TrainerModel> {
    const userData = this.trainerService.createTrainer(body);

    return userData;
  }
}
