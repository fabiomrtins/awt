import { PrismaClient } from '@prisma/client'
import * as fs from 'fs';
import { join } from 'path';
import * as readLine from 'readline';
import { PokemonService } from 'src/services/pokemon.service';

const prisma = new PrismaClient()

async function main() {
    try {
        const readline = readLine.createInterface({
            input: fs.createReadStream(join("./csv/pokemons.csv")),
            crlfDelay: Infinity
        })

        for await (const pokemonName of readline) {
            await prisma.pokemon.create({
                data: {
                    name: pokemonName.split(",")[0]
                }
            })
        }
    } catch (error) {
        console.log(error);
    }
}

main()