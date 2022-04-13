import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PokemonOnTrainer, Trainer as TrainerModel } from '@prisma/client';
import { TrainerService } from 'src/services/trainer.service';
@Controller('trainers')
export class TrainerController {
  constructor(private readonly trainerService: TrainerService) { }

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

  @Post('/:id/pokemons')
  addPokemonsToUser(@Param('id') id: string, @Body() data: any): Promise<any> {
    for (const pokemonData of data) {
      pokemonData.trainerId = id
    }
    
    const pokemons: any = this.trainerService.addPokemons(data);

    return pokemons;
  }

  @Post()
  create(@Body() body: TrainerModel): Promise<TrainerModel> {
    const userData = this.trainerService.createTrainer(body);

    return userData;
  }

  @Delete('/:trainerId/pokemons/:pokemonId')
  delete(@Param('trainerId') trainerId: string, @Param('pokemonId') pokemonId: string): Promise<any> {
    const removedData: any = this.trainerService.removePokemon(trainerId, pokemonId)

    return removedData;
  }
}
