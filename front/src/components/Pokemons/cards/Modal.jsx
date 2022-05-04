import React, { useEffect, useState } from "react";
import Select from "../../Select";

export default function Modal(props) {
  const {
    allTypes,
    handleSubmit,
    handleEdit,
    handleSelectDelete,
    handleModal,
    title,
    item,
  } = props;
  const [showModal, setShowModal] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [pokemonToBeCreated, setPokemonToBeCreated] = useState({
    name: null,
    trainerId: localStorage.getItem("trainerId"),
    level: null,
    types: [],
  });

  useEffect(() => {
    if (item) {
      setPokemonToBeCreated(item);
      setIsEditing(true);
    }
  }, []);

  return showModal ? (
    <div
      className="flex items-center bg-black/50 w-full h-full z-10 fixed inset-0"
      onClick={(e) => {
        handleModal(!showModal);
      }}
    >
      <div
        className="flex flex-col bg-white my-16 w-80 h-80 border-4 border-grey-50 p-4 gap-2 z-20 mx-auto"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h1 className="self-center text-green-600 text-3xl">{title}</h1>
        <label htmlFor="name" className="text-theme">
          Nome:
        </label>
        <input
          type="text"
          id="name"
          defaultValue={pokemonToBeCreated.name}
          className="appearence-none border-2 border-theme w-full"
          onBlur={(e) =>
            setPokemonToBeCreated({
              ...pokemonToBeCreated,
              name: e.target.value,
            })
          }
        />
        <label htmlFor="level" className="text-theme">
          Level:
        </label>
        <input
          type="number"
          id="level"
          defaultValue={pokemonToBeCreated.level}
          className="appearence-none border-2 border-theme w-full"
          onBlur={(e) =>
            setPokemonToBeCreated({
              ...pokemonToBeCreated,
              level: parseInt(e.target.value),
            })
          }
        />
        <Select
          list={allTypes}
          label="Tipos:"
          keyToBeRendered="description"
          defaultDescriptionsValue={pokemonToBeCreated?.types.map(
            (type) => type.description
          )}
          handleSelect={(value) =>
            setPokemonToBeCreated({
              ...pokemonToBeCreated,
              types: [
                ...pokemonToBeCreated["types"],
                {
                  id: value,
                },
              ],
            })
          }
          handleListDelete={(item) => {
            handleSelectDelete({
              id: pokemonToBeCreated.id,
              typeId: item[0].id,
            });
          }}
        />
        <button
          className="bg-theme p-2 mr-auto w-40 text-white mx-auto"
          type="submit"
          onClick={() => {
            isEditing ? handleEdit(pokemonToBeCreated)  : handleSubmit(pokemonToBeCreated)
            handleModal(!showModal);
          }}
        >
          Cadastrar
        </button>
      </div>
    </div>
  ) : (
    ""
  );
}
