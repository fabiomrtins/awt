import React, { useEffect } from 'react';
import { useState } from "react"
import Card from '../components/cards/Card';
import instance from '../config/instance';

export default function Pokemon() {
  const [pokemons, setPokemons] = useState([{}])
  const postData = {
    title: "",
    content: "",
    authorId: "18910e57-bd33-4c36-a7f4-1f8df7aed4b0"
  }

  async function handleSubmit() {
    console.log(postData)
    const request = await instance.post('/posts', postData)
    
    if(request.status) {
      pokemons.push(postData)
      console.log(pokemons);
      setPokemons(pokemons)
    }
  }
  
  console.log(postData)
  useEffect(() => {
    async function getPokemons() {
      const response = await instance.get('/posts/users/18910e57-bd33-4c36-a7f4-1f8df7aed4b0')
      setPokemons(response.data)
    }

    getPokemons()
  }, [])

  return (
    <div className='flex items-center mx-auto my-4'>
      <div className='mx-auto'>
        <Card items={pokemons} />
        <div className='mx-auto my-16 w-72 h-52 border-4 border-grey-50 p-4 gap-2'>
          <input type="text" className='w-full border-2 border-indigo-500' onChange={(e) => postData.title = e.target.value}/>
          <input type="text" className='w-full border-2 border-indigo-500' onChange={(e) => postData.content = e.target.value}/>
          <button className='bg-indigo-500 p-2 mr-auto text-white' type='submit' onClick={handleSubmit}>Cadastrar</button>
        </div>
      </div>
    </div>
  )
} 