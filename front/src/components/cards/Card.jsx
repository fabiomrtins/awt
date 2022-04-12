import React from "react";
import deleteIcon from '../../icons/crud/delete.svg'

export default function Card(items) {
  return items.items.length > 0 ? (
    <div className="flex flex-wrap bg-white gap-4">
      {items.items.map((item) => (
        <div className="w-80 h-40 border-2 px-4 rounded-xl" key={`${item.id}`}>
          <h4 className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {item.title}
          </h4>
          <p>{item.content}</p>
          <span className="w-10 h-10 align-bottom">
            <img src={deleteIcon} alt="" />
          </span>
        </div>
      ))}
    </div>
  ) : (
    <h1>Não há nenhum post cadastrado.</h1>
  );
}
