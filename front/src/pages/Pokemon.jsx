import React, { useEffect } from "react";
import { useState } from "react";
import Card from "../components/cards/Card";
import instance from "../config/instance";

export default function Pokemon() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonToBeCreated, setPokemonToBeCreated] = useState("");
  const [allPokemons, setAllPokemons] = useState([]);
  const trainerId = "499cb299-2848-44b2-b30b-0f92501730ee";
  const [pokemonsChanged, setPokemonsChanged] = useState(false);

  const postData = [];

  async function handleSubmit() {
    const request = await instance.post(
      `/trainers/${trainerId}/pokemons`,
      postData
    );

    if (request.status === 201) {
      setPokemonsChanged(!pokemonsChanged);
    }
  }

  async function createPokemon(data) {
    await instance.post("/pokemons", {
      name: data,
    });

    setPokemonsChanged(!pokemonsChanged);
    setPokemonToBeCreated("");
  }

  async function handleDelete(id) {
    await instance.delete(`/trainers/${trainerId}/pokemons/${id}`);
    setPokemonsChanged(!pokemonsChanged);
  }

  useEffect(() => {
    async function getPokemons() {
      const response = await instance.get(`/trainers/${trainerId}/pokemons`);
      setPokemons(response.data);
    }

    getPokemons();
  }, [pokemonsChanged]);

  useEffect(() => {
    async function getAllPokemons() {
      const response = await instance.get("/pokemons");
      setAllPokemons(response.data);
    }

    getAllPokemons();
  }, []);

  pokemons.map((pokemon) => {
    console.log(pokemon);
  });

  return (
    <div className="flex items-center mx-auto my-4">
      <div className="mx-auto">
        <div className="flex flex-col gap-2 items-center">
          <div className="flex flex-wrap gap-2 mx-auto">
            {pokemons.map((pokemon, index) => (
              <Card item={pokemon} handleDelete={handleDelete} key={index} />
            ))}
          </div>
          <div className="flex">
            <div className="my-16 w-72 h-52 border-4 border-grey-50 p-4 gap-2">
              <label htmlFor="pokemon" className="text-indigo-500">
                Cadastre um novo pokemon:{" "}
              </label>
              <input
                type="text"
                className="appearence-none border-2 border-indigo-500 w-full"
                onChange={(e) => {
                  setPokemonToBeCreated(e.target.value);
                  console.log(e.target.value);
                }}
              />
              <button
                className="bg-indigo-500 p-2 mr-auto text-white"
                type="submit"
                onClick={() => createPokemon(pokemonToBeCreated)}
              >
                Cadastrar
              </button>
            </div>
            <div className="my-16 w-72 h-52 border-4 border-grey-50 p-4 gap-2">
              <label htmlFor="pokemon" className="text-indigo-500">
                Cadastre um novo pokemon para esse usuário:{" "}
              </label>
              <select
                name="pokemons"
                id="pokemon"
                defaultValue="empty"
                className="appearence-none border-2 border-indigo-500 w-full"
                onChange={(e) => {
                  postData.push({ pokemonId: e.target.value });
                }}
              >
                <option disabled value="empty">
                  Nenhum pokemon selecionado.
                </option>
                {allPokemons.map((pokemon) => (
                  <option key={pokemon.id} value={pokemon.id}>
                    {pokemon.name}
                  </option>
                ))}
              </select>
              <button
                className="bg-indigo-500 p-2 mr-auto text-white"
                type="submit"
                onClick={handleSubmit}
              >
                Cadastrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
