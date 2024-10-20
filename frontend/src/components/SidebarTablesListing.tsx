"use client";

import React, { useState } from "react";
import Button from "./ButtonComponent";
import SimpleText from "./SimpleTextComponent";
import Input from "./InputComponent";
import { createTable } from "@/tables/createTable";
import { getCookie } from "@/auth/getCookie";
import { deleteTable } from "@/tables/deleteTable";
import ConfirmationPopup from "./ConfirmationPopup";

type TablesType = {
  name: string;
  id: number;
};

interface SidebarProps {
  onClick: (index: number) => void;
  styles?: string;
  tables: TablesType[] | undefined;
}

const SideBarTables: React.FC<SidebarProps> = ({ styles, onClick, tables }) => {
  const [iscreating, setIscreating] = useState<boolean>(false);
  const [newtablename, setNewtablename] = useState<string>("");
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  async function handleCreateTable() {
    try {
      if (newtablename.length < 2) return;
      const userid = getCookie("X-AUTH-B");
      const token = getCookie("X-AUTH-A");
      const response = await createTable(newtablename, userid, token);
      if (response) {
        location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function handleDeleteTable(index: number) {
    console.log(index);
    try {
      const token = getCookie("X-AUTH-A");
      const response = await deleteTable(index, token);
      console.log(response);
      if (response) {
        location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      id="sidebar"
      className={`${
        styles ?? ""
      } bg-blue-600 max-w-72 min-w-72 flex flex-col py-4 px-4`}
    >
      {tables &&
        (tables.length > 0 ? (
          <ul>
            {tables.map((table, index) => (
              <li
                className="text-white text-lg w-full size-fit inline-flex justify-between items-center"
                key={index}
              >
                <span
                  className="truncate max-w-[75%] cursor-pointer"
                  onClick={() => onClick(index)}
                >
                  {index + 1} - {table.name}
                </span>
                <svg
                  className="cursor-pointer"
                  onClick={() => setIsPopupOpen(true)}
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="23"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5t.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5t-.288.713T19 6v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zm-7 11q.425 0 .713-.288T11 16V9q0-.425-.288-.712T10 8t-.712.288T9 9v7q0 .425.288.713T10 17m4 0q.425 0 .713-.288T15 16V9q0-.425-.288-.712T14 8t-.712.288T13 9v7q0 .425.288.713T14 17M7 6v13z"
                  />
                </svg>
                <ConfirmationPopup
                  isOpen={isPopupOpen}
                  message="Are you sure you want to delete this item?"
                  onConfirm={() => handleDeleteTable(table.id)}
                  onCancel={() => setIsPopupOpen(false)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white">No tables available</p>
        ))}
      <div className="flex flex-col justify-center items-center mt-4">
        {!iscreating && (
          <Button
            styles="bg-gray-200 hover:bg-gray-300 size-fit self-start !text-black"
            text="Create table"
            onClick={() => setIscreating(true)}
          />
        )}
        {iscreating && (
          <Input
            max={50}
            value={newtablename}
            type="text"
            placeholder="Table name"
            onChange={(e) => setNewtablename(e.target.value)}
          />
        )}
        {iscreating && (
          <div className="flex justify-between w-full px-6">
            <SimpleText
              styles="text-white cursor-pointer size-fit !p-2"
              message={"Cancel"}
              onClick={() => {
                setIscreating(false);
                setNewtablename("");
              }}
            />
            <SimpleText
              styles="text-white cursor-pointer size-fit !p-2"
              message={"Create"}
              onClick={() => {
                setIscreating(false);
                setNewtablename("");
                handleCreateTable();
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBarTables;
