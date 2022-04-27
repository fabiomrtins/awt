import React from "react";
import instance from "../../config/instance";
import deleteIcon from '../../icons/crud/delete.svg'


export default function Card(props) {
  console.log(props)
  return (
    <div className="flex flex-wrap bg-white gap-4">
        <div className="w-80 h-40 border-2 px-4 rounded-xl">
          <label htmlFor={props.id}>Pokemon:</label>
          <h4 className="uppercase tracking-wide text-sm text-indigo-500 font-semibold" id={props.item.id}>
            {props.item.pokemon?.name}
          </h4>
          <p>Level: {props.item.level}</p>
          <span className="w-10 h-10 align-bottom">
            <img src={deleteIcon} onClick={(e) => props.handleDelete(props.item.id)} alt="" />
          </span>
        </div>
    </div>
  )
}
