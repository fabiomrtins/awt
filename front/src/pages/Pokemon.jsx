import React, { useEffect } from 'react';
import { useState } from "react"
import Card from '../components/cards/Card';
import instance from '../config/instance';

export default function Pokemon() {
  const [pokemons, setPokemons] = useState([])
  const [allPokemons, setAllPokemons] = useState([])
  const trainerId = "ce771e34-c3f6-4794-b4cf-167b53144561"
  const [pokemonsChanged, setPokemonsChanged] = useState(false)

  const postData = []

  async function handleSubmit() {
    const request = await instance.post(`/trainers/${trainerId}/pokemons`, postData)

    if (request.status === 201) {
      console.log("changed");
      setPokemonsChanged(!pokemonsChanged)
    }
  }

  useEffect(() => {
    async function getPokemons() {
      const response = await instance.get(`/trainers/${trainerId}/pokemons`)
      setPokemons(response.data)
    }

    getPokemons()
  }, [pokemonsChanged])

  useEffect(() => {
    async function getAllPokemons() {
      const response = await instance.get('/pokemons')
      setAllPokemons(response.data)
    }

    getAllPokemons()
  }, [])

  return (
    <div className='flex items-center mx-auto my-4'>
      <div className='mx-auto'>
        <Card items={pokemons} trainerId={trainerId} />
        <div className='mx-auto my-16 w-72 h-52 border-4 border-grey-50 p-4 gap-2'>
          <label htmlFor="pokemon" className='text-indigo-500'>Pokemons: </label>
          <select name="pokemons" id="pokemon" defaultValue="empty" className='appearence-none border-2 border-indigo-500 w-full' onChange={(e) => {postData.push({ pokemonId: e.target.value })}}>
            <option disabled value="empty">Nenhum pokemon selecionado.</option>
            {
              allPokemons.map((pokemon) => <option key={pokemon.id} value={pokemon.id}>{pokemon.name}</option>)
            }
          </select>
          <button className='bg-indigo-500 p-2 mr-auto text-white' type='submit' onClick={handleSubmit}>Cadastrar</button>
        </div>
      </div>
    </div>
  )
} 