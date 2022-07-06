import { Body, Controller, Delete, Get, Param, Post, Res } from '@nestjs/common';
import { Trainer as TrainerModel } from '@prisma/client';
import { TrainerService } from '../../services/trainer.service';
import { PokemonService } from '../../services/pokemon.service';
import { Response } from 'express';
@Controller('trainers')
export class TrainerController {
  constructor(private readonly trainerService: TrainerService, private readonly pokemonService: PokemonService) { }

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

  @Get('/:id/pokemons')
  getPokemonsByUserId(@Param('id') id: string): Promise<any> {
    const pokemons: any = this.trainerService.getPokemons(id);

    return pokemons;
  }


  @Post()
  create(@Body() body: TrainerModel, @Res() res: Response): Promise<TrainerModel> | Response {

    if(!body.email) {
      return res.status(404).send({
        message: "Email inválido."
      })
    }
    
    const userData = this.trainerService.createTrainer(body);

    return res.send(userData);
  }

  @Delete('/:trainerId/pokemons/:pokemonId')
  delete(@Param('trainerId') trainerId: string, @Param('pokemonId') pokemonId: string): Promise<any> {
    const removedData: any = this.pokemonService.deletePokemon({
      id: pokemonId
    })

    return removedData;
  }
}
