import React, { useState } from "react";
import deleteIcon from "../../../icons/crud/delete.svg";
import editIcon from "../../../icons/crud/edit.svg";
import Input from "../../Input";

export default function TypeCard(props) {
  const { handleDelete, handleEdit } = props;
  const [item, setItem] = useState(props.item);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex flex-col w-80 h-40 border-2 px-4 rounded-xl">
      <Input
        label="Tipo:"
        defaultValue={item.description}
        disabled={!isEditing}
        handleChange={(description) => {
          setItem({
            ...item,
            description: description,
          });
        }}
      />
      <Input
        label="Forte:"
        defaultValue={item.strenghts}
        disabled={!isEditing}
        handleChange={(strenght) => {
          setItem({
            ...item,
            strenghts: strenght,
          });
        }}
      />
      <Input
        label="Fraco:"
        defaultValue={item.weaknesses}
        disabled={!isEditing}
        handleChange={(weakness) => {
          setItem({
            ...item,
            weaknesses: weakness,
          });
        }}
      />
      <div id="configButtons" className="flex">
        <span className="w-6 h-6 align-bottom mx-0">
          <img src={deleteIcon} onClick={() => handleDelete(item.id)} />
        </span>
        <span className="w-6 h-6 align-bottom mx-0">
          <img
            src={editIcon}
            onClick={() => {
              handleEdit(item);
              setIsEditing(!isEditing);
            }}
          />
        </span>
      </div>
    </div>
  );
}
