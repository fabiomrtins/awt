import React, { useEffect } from "react";
import { useState } from "react";

export default function Select(props) {
  const [renderList, setRenderList] = useState(false)
  const { list, label, keyToBeRendered, handleSelect, handleListDelete, defaultDescriptionsValue} = props
  const [descriptions, setDescriptions] = useState([])
  
  useEffect(() => {
    if(defaultDescriptionsValue?.length > 0 && descriptions.length < defaultDescriptionsValue.length) {
      setDescriptions([...defaultDescriptionsValue])
    }
  }, [defaultDescriptionsValue])
  
  function getItemDataByKey(key) {
    const itemData = list?.filter((item) => {
      if(item.description === key) {
        return true
      }

      return false
    })

    return itemData
  }

  return (
    <div>
      <label htmlFor="level" className="text-theme">
        {label}
      </label>
      <div className="flex gap-2 border-2 px-2 w-full h-7 border-theme" onClick={() => {
        setRenderList(!renderList)
      }}>
        {descriptions?.map((selectDescription, index) => (
          <div className="flex bg-theme rounded-sm w-auto px-2 h-auto" key={index}>
            <p className="">{selectDescription}</p>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 48 48"><path d="M12.45 37.65 10.35 35.55 21.9 24 10.35 12.45 12.45 10.35 24 21.9 35.55 10.35 37.65 12.45 26.1 24 37.65 35.55 35.55 37.65 24 26.1Z" onClick={() => {
              const itemData = getItemDataByKey(selectDescription)
              handleListDelete(itemData)
              const updatedDescriptionList = descriptions.filter((description) => {
                if(description !== selectDescription) {
                  return true
                }

                false
              })
              setDescriptions(updatedDescriptionList)
            }}/></svg>
          </div>
        ))}
      </div>
      {
        renderList ? 
        <ul className="flex flex-col border-1">
          {list.map((listItem, index) => (
            <li
              className={"bg-white border-b-2 rounded-sm w-auto px-2 h-auto hover:bg-gray-50"}
              key={index}
              onClick={(e) => {
                handleSelect(listItem.id)
                setDescriptions([
                  ...descriptions,
                  listItem[keyToBeRendered],
                ]);
                setRenderList(!renderList)
                e.stopPropagation()
              }}
            >
              {listItem[keyToBeRendered]}
            </li>
          ))}
        </ul> : ""
      }
    </div>
  );
}
