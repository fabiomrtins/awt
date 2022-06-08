import { Body, Controller, Delete, Get, Param, Post, Res } from '@nestjs/common';
import { PokemonOnTrainer, Trainer as TrainerModel } from '@prisma/client';
import { TrainerService } from 'src/services/trainer.service';
import * as jwt from 'jsonwebtoken'
import * as argon2 from 'argon2'
import { Response } from 'express';
import { env } from 'process';

@Controller('trainers')
export class TrainerController {
  constructor(private readonly trainerService: TrainerService, private readonly pokemonService: PokemonService) { }

  @Get()
  findAll(): Promise<TrainerModel[] | []> {
    const users: Promise<TrainerModel[] | []> = this.trainerService.findAll();

    return users;
  }

  @Post("login")
  async login(@Body() body: any, @Res() res: Response): Promise<TrainerModel[] | Response> {
    try {
      const userData: TrainerModel[] = await this.trainerService.trainers({
        where: {
          email: body.email,
        }
      })
      
      if (!(userData.length > 0)) {
        return res.status(400).send({
          message: "Usuário ou senha incorretos."
        })
      }

      const userIsValid = await argon2.verify(userData[0].password, body.password)

      if (!userIsValid) {
        return res.status(400).send({
          message: "Usuário ou senha incorretos."
        })
      }
      
      return res.send({
        token: jwt.sign({ id: userData[0].id }, env.JWT_SECRET)
      })
    } catch (error) {
      console.log(error)
      return res.status(500).send({
        message: "Ocorreu um erro interno no servidor."
      })
    }
  }

  @Get('/:id/pokemons')
  getPokemonsByUserId(@Param('id') id: string): Promise<any> {
    const pokemons: any = this.trainerService.getPokemons(id);

    return pokemons;
  }


  @Post()
  async create(@Body() body: TrainerModel, res: Response): Promise<Response> {
    try {
      const userData = await this.trainerService.createTrainer({
        ...body,
        password: await argon2.hash(body.password)
      });
  
      return res.send({
        message: "Usuário registrado com sucesso."
      });
    } catch (error) {
      return res.status(500).send({
        message: "Ocorreu um erro interno no servidor."
      })
    }
  }

  @Delete('/:trainerId/pokemons/:pokemonId')
  delete(@Param('trainerId') trainerId: string, @Param('pokemonId') pokemonId: string): Promise<any> {
    const removedData: any = this.pokemonService.deletePokemon({
      id: pokemonId
    })

    return removedData;
  }
}
