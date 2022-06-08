import React, { useEffect, useState } from "react";
import TypeCard from "../components/Types/cards/TypeCard";
import TypeModal from "../components/Types/cards/TypeModal";
import Input from "../components/Input";
import instance from "../config/instance";

export default function Types() {
  const [allTypes, setAllTypes] = useState([]);
  const [itemToBeEdited, setItemToBeEdited] = useState(null);
  const [dataChanged, setDataChanged] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);

  async function createType(data) {
    await instance.post("/types", {
      ...data,
      strenghts: [],
      weaknesses: []
    });

    setDataChanged(!dataChanged);
  }

  async function deleteType(data) {
    await instance.delete("/types/" + data);
    setDataChanged(!dataChanged);
  }

  async function updateType(data) {
    await instance.put("/types/" + data.id, data);
    setDataChanged(!dataChanged);
  }

  useEffect(() => {
    async function getAllTypes() {
      const response = await instance.get("/types");
      setAllTypes(response.data);
    }

    getAllTypes();
  }, [dataChanged]);

  return (
    <div className="flex flex-col gap-2 items-center mx-auto my-4">
      {allTypes.map((type, index) => (
        <TypeCard
          key={index}
          label="Tipo:"
          item={type}
          handleEdit={(item) => {
            setItemToBeEdited(item)
            setToggleModal(!toggleModal)
          }}
          handleDelete={deleteType}
        />
      ))}
      {toggleModal ? (
        <TypeModal
          title="Tipo"
          handleModal={() => setToggleModal(!toggleModal)}
          item={itemToBeEdited}
          handleSubmit={createType}
          handleEdit={updateType}
          types={allTypes}
        />
      ) : (
        ""
      )}
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
    </div>
  );
}
