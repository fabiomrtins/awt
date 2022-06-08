import React, { useEffect, useState } from "react";
import Input from "../../Input";
import Select from "../../Select";

export default function Modal(props) {
  const { handleSubmit, handleEdit, handleModal, title, item, types } = props;

  const [showModal, setShowModal] = useState(true);
  const [isCreating, setIsCreating] = useState(true);
  const [typeToBeCreated, setTypeToBeCreated] = useState({
    strenghts: null,
    weaknesses: null
  });
  const [allTypes, setAllTypes] = useState(types);

  useEffect(() => {
    if (item) {
      setTypeToBeCreated(item);
      setIsCreating(!isCreating);
    }
  }, [item]);

  console.log(typeToBeCreated)
  return showModal ? (
    <div
      className="flex items-center bg-black/50 w-full h-full z-10 fixed inset-0"
      onClick={(e) => {
        handleModal(!showModal);
        setIsCreating(true)
        setTypeToBeCreated(null)
      }}
    >
      <div
        className="flex flex-col bg-white my-16 w-80 h-80 border-4 border-grey-50 p-4 gap-2 z-20 mx-auto"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h1 className="self-center text-green-600 text-3xl">{title}</h1>
        <label htmlFor="description:" className="text-theme">
          Tipo:
        </label>
        <Input
          id="description"
          defaultValue={item?.description ? item.description : ""}
          handleChange={(description) => {
            setTypeToBeCreated({
              ...typeToBeCreated,
              description: description,
            });
          }}
        />
        <Select
          list={allTypes}
          label="Forte contra:"
          keyToBeRendered="description"
          defaultDescriptionsValue={typeToBeCreated?.weaknesses}
          handleSelect={(value) =>
            {
              console.log("valorzin")
              console.log(value)
              setTypeToBeCreated({
                  ...typeToBeCreated["weaknesses", value]
              })
            }
          }
        />
        <Select
          list={allTypes}
          label="Fraco contra:"
          keyToBeRendered="description"
          defaultDescriptionsValue={typeToBeCreated?.strenghts}
          handleSelect={(value) => {
            setTypeToBeCreated({
              ...typeToBeCreated,
              types: [
                ...typeToBeCreated["strenghts"],
                {
                  id: value,
                },
              ],
            });
          }}
        />
        <button
          className="bg-theme p-2 mr-auto w-40 text-white mx-auto"
          type="submit"
          onClick={() => {
            isCreating
              ? handleSubmit(typeToBeCreated)
              : handleEdit(typeToBeCreated);
            handleModal(!showModal);
          }}
        >
          { isCreating ? "Cadastrar" : "Editar"}
        </button>
      </div>
    </div>
  ) : (
    ""
  );
}
