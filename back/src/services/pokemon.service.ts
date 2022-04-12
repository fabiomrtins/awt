import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Pokemon, Prisma } from '@prisma/client';

@Injectable()
export class PokemonService {
  constructor(private prisma: PrismaService) {}

  async createPokemon(data: Prisma.PokemonCreateInput): Promise<Pokemon> {
    return this.prisma.pokemon.create({
      data,
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
    data: Prisma.PokemonUpdateInput;
  }): Promise<Pokemon> {
    const { data, where } = params;
    return this.prisma.pokemon.update({
      data,
      where,
    });
  }

  async deletePokemon(where: Prisma.PokemonWhereUniqueInput): Promise<Pokemon> {
    return this.prisma.pokemon.delete({
      where,
    });
  }

  async findAll(): Promise<Pokemon[] | []> {
    return this.prisma.pokemon.findMany();
  }
}
