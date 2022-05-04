import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Pokemon, Prisma } from '@prisma/client';

@Injectable()
export class PokemonService {
  constructor(private prisma: PrismaService) {}

  async createPokemon(data: any): Promise<Pokemon> {
    return this.prisma.pokemon.create({
      data: {
        ...data,
        types: {
          connect: data.types
        }
      }
    });
  }

  async pokemons(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PokemonWhereUniqueInput;
    where?: Prisma.PokemonWhereInput;
    orderBy?: Prisma.PokemonOrderByWithRelationInput;
  }): Promise<Pokemon[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.pokemon.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async updatePokemon(params: {
    where: Prisma.PokemonWhereUniqueInput;
    data: any;
  }): Promise<Pokemon> {
    const { data, where } = params;
    return this.prisma.pokemon.update({
      data: {
        ...data,
        types: {
          connect: data.types
        }
      },
      where
    });
  }

  async deletePokemon(where: Prisma.PokemonWhereUniqueInput): Promise<Pokemon> {
    return this.prisma.pokemon.delete({
      where,
    });
  }

  async removeType(params: {
    where: Prisma.PokemonWhereUniqueInput;
    typeId: any;
  }): Promise<Pokemon> {
    return this.prisma.pokemon.update({
      where: params.where,
      data: {
        types: {
          delete: {id: params.typeId},
        },
      },
    });
  }

  async findAll(): Promise<Pokemon[] | []> {
    return this.prisma.pokemon.findMany();
  }
}
