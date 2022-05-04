import React, { useEffect } from "react";
import { useState } from "react";
import Card from "../components/Pokemons/cards/Card";
import instance from "../config/instance";
import Modal from "../components/Pokemons/cards/Modal";

export default function Pokemon() {
  const [pokemons, setPokemons] = useState([]);
  const [allTypes, setAllTypes] = useState([]);
  const trainerId = localStorage.getItem("trainerId");
  const [pokemonsChanged, setPokemonsChanged] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);
  const [itemToBeEdited, setItemToBeEdited] = useState(null);

  async function handleSubmit(data) {
    const request = await instance.post(`/pokemons`, data);

    if (request.status === 201) {
      setPokemonsChanged(!pokemonsChanged);
    }
  }

  async function updatePokemon(data) {
    const pokemonData = {
      ...data,
    };

    pokemonData.types = pokemonData.types.map((type) => {
      return {
        id: type.id,
      };
    });

    await instance.put("/pokemons/update/" + pokemonData.id, pokemonData);
    setPokemonsChanged(!pokemonsChanged);
  }

  async function deletePokemonType(data) {
    await instance.delete(`/pokemons/${data.id}/types/${data.typeId}`);
    setPokemonsChanged(!pokemonsChanged);
  }

  async function handleDelete(id) {
    await instance.delete(`/trainers/${trainerId}/pokemons/${id}`);
    setPokemonsChanged(!pokemonsChanged);
  }

  useEffect(() => {
    async function getUsersPokemons() {
      const response = await instance.get(`/trainers/${trainerId}/pokemons`);
      setPokemons(response.data);
    }

    getUsersPokemons();
  }, [pokemonsChanged]);

  useEffect(() => {
    async function getAllTypes() {
      const response = await instance.get("/types");
      setAllTypes(response.data);
    }

    getAllTypes();
  }, []);

  console.log(toggleModal);
  return (
    <div className="flex items-center mx-auto my-4">
      <div className="mx-auto">
        <div className="flex flex-col gap-2 items-center">
          <div className="flex flex-wrap gap-2 mx-auto">
            {pokemons.map((pokemon, index) => (
              <Card
                item={pokemon}
                handleDelete={handleDelete}
                handleEdit={(item) => {
                  setItemToBeEdited(item);
                  setToggleModal(!toggleModal);
                }}
                key={index}
              />
            ))}
          </div>
          <div className="flex">
            <button
              className="bg-theme p-2 text-white rounded-md"
              onClick={() => setToggleModal(!toggleModal)}
            >
              <span className="flex">
                Novo
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7 fill-white"
                  viewBox="0 0 48 48"
                >
                  <path d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z" />
                </svg>
              </span>
            </button>
            {toggleModal ? (
              <Modal
                title="Pokemon"
                allTypes={allTypes}
                handleSubmit={handleSubmit}
                handleModal={() => setToggleModal(!toggleModal)}
                handleEdit={updatePokemon}
                handleSelectDelete={deletePokemonType}
                item={itemToBeEdited}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
