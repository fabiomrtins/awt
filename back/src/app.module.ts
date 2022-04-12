import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonController } from './controllers/pokemons/pokemon.controller';
import { TypeController } from './controllers/types/type.controller';
import { UserController } from './controllers/trainers/trainer.controller';
import { PokemonService } from './services/pokemon.service';
import { PrismaService } from './services/prisma.service';
import { TrainerService } from './services/trainer.service';
import { TypeService } from './services/type.service';

@Module({
  imports: [],
  controllers: [AppController, UserController, PokemonController, TypeController],
  providers: [AppService, TrainerService, PokemonService, PrismaService, TypeService],
})
export class AppModule {}
