import React from "react";

type tablesType = {
  name: string;
};

interface SidebarProps {
  onClick: (index: number) => void;
  styles?: string;
  tables: tablesType[] | undefined;
}

const SideBarTables: React.FC<SidebarProps> = ({ styles, onClick, tables }) => {
  return (
    <div
      className={`${
        styles ?? ""
      } bg-blue-600 w-1/6 flex flex-col justify-center`}
    >
      {tables &&
        (tables.length > 0 ? (
          <ul>
            {tables.map((table, index) => (
              <li
                className="text-white"
                key={index}
                onClick={() => onClick(index)}
              >
                {index + 1} - {table.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white">No tables available</p>
        ))}
    </div>
  );
};

export default SideBarTables;
