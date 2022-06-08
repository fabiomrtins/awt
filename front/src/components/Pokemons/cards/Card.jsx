import React, { useState } from "react";
import deleteIcon from "../../../icons/crud/delete.svg";
import editIcon from "../../../icons/crud/edit.svg";
import Input from "../../Input";

export default function Card(props) {
  const { handleDelete, handleEdit } = props
  const [item, setItem] = useState(props.item)
  const [isEditing, setIsEditing] = useState(false)
  
  return (
    <div className="flex flex-col w-80 h-40 border-2 px-4 rounded-xl">
      <Input defaultValue={item.name} disabled={!isEditing} handleChange={(name) => {
        setItem({
          ...item,
          name: name
        })
      }} />
      <Input type="number" defaultValue={item.level} label="Level:" disabled={!isEditing} handleChange={
        (level) => {
          parseInt(level) ? setItem({
            ...item,
            level: parseInt(level)
          }) : ""
        }
      }/>
      {/* <Select list  /> */}
      <div className="flex gap-2">
        <p>Tipos:</p>
        {item?.types?.map((type, index) => {
          return <p key={index}>{type.description}</p>;
        })}
      </div>
      <div id="configButtons" className="flex">
        <span className="w-6 h-6 align-bottom mx-0">
          <img
            src={deleteIcon}
            onClick={() => handleDelete(item.id)}
          />
        </span>
        <span className="w-6 h-6 align-bottom mx-0">
          <img
            src={editIcon}
            onClick={() => handleEdit(item)}
          />
        </span>
      </div>
        {
          isEditing ?
          <button className="bg-theme text-white p-1" onClick={() => {
            handleEdit(item)
            setIsEditing(!isEditing)
          }}>
            Salvar
          </button>
          : ""
        }
    </div>
  );
}
