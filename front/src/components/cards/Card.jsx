import React from "react";
import instance from "../../config/instance";
import deleteIcon from '../../icons/crud/delete.svg'


export default function Card(items,) {
  const trainerId = "ce771e34-c3f6-4794-b4cf-167b53144561"
  async function handleDelete(id) {
    const response = await instance.delete(`/trainers/${trainerId}/pokemons/${id}`)
  }
  
  return items.items.length > 0 ? (
    <div className="flex flex-wrap bg-white gap-4">
      {items.items.map((item, index) => (
        <div className="w-80 h-40 border-2 px-4 rounded-xl" key={`${index}`}>
          <label htmlFor={index}>Pokemon:</label>
          <h4 className="uppercase tracking-wide text-sm text-indigo-500 font-semibold" id={index}>
            {item.pokemon?.name}
          </h4>
          <p>Level: {item.level}</p>
          <span className="w-10 h-10 align-bottom">
            <img src={deleteIcon} onClick={(e) => handleDelete(item.id)} alt="" />
          </span>
        </div>
      ))}
    </div>
  ) : (
    <h4 className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Não há nenhum Pokemon cadastrado.</h4>
  );
}
