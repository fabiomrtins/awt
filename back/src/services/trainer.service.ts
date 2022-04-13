import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Trainer, Prisma } from '@prisma/client';

@Injectable()
export class TrainerService {
  constructor(private prisma: PrismaService) {}

  async createTrainer(data: Prisma.TrainerCreateInput): Promise<Trainer> {
    return this.prisma.trainer.create({
      data,
    });
  }

  async trainers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TrainerWhereUniqueInput;
    where?: Prisma.TrainerWhereInput;
    orderBy?: Prisma.TrainerOrderByWithRelationInput;
  }): Promise<Trainer[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.trainer.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
  
  async findAll(): Promise<Trainer[] | []> {
    return this.prisma.trainer.findMany();
  }

  async getPokemons(id: string): Promise<any> {
    const pokemonData = await this.prisma.pokemonOnTrainer.findMany({
      where: {
        trainerId: id
      },
      select: {
        id: true,
        level: true,
        pokemon: true
      }
    })

    return pokemonData
  }
  
  async addPokemons(data: Prisma.PokemonOnTrainerCreateManyInput): Promise<any> {
    return this.prisma.pokemonOnTrainer.createMany({
      data
    })
  }

  async removePokemon(trainerId: string, pokemonId): Promise<any> {
    return await this.prisma.pokemonOnTrainer.delete({
      where: {
        id: pokemonId,
      }
    })
  }
}
