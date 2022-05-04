import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { Pokemon as PokemonModel } from '@prisma/client';
import { PokemonService } from '../../services/pokemon.service';

@Controller('pokemons')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  findAll(): Promise<PokemonModel[] | []> {
    const pokemons: Promise<PokemonModel[] | []> = this.pokemonService.findAll();

    return pokemons;
  }

  @Post()
  create(@Body() body: PokemonModel): Promise<PokemonModel> {
    const postData = this.pokemonService.createPokemon(body);

    return postData;
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() body: PokemonModel): Promise<PokemonModel> {
    const updateData = this.pokemonService.updatePokemon({
      where: { id: id },
      data: body
    })

    return updateData
  }

  @Delete(':id/types/:typeId')
  deleteType(@Param() params: {
    id: string,
    typeId: string
  }): any {
    const updateData = this.pokemonService.removeType({
      where: { id: params.id },
      typeId: params.typeId
    })

    return updateData
  }
}
