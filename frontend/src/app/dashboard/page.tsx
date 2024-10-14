"use client";

import { getCookie } from "@/auth/getCookie";
import { isTokenValid } from "@/auth/isTokenValid";
import SideBarTables from "@/components/SidebarTablesListing";
import { getUser } from "@/user/getUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  type ColumnsType = {
    id: number;
    name: string;
    table: TablesType;
    tableId: number;
  };
  type RowsType = {
    id: number;
    table: TablesType;
    tableId: number;
    data: JSON;
  };
  type AttachmentsType = {
    id: number;
    table: TablesType;
    tableId: number;
    url: string;
    createdAt: Date;
  };
  type TablesType = {
    id: number;
    name: string;
    user: User;
    userId: number;
    columns: ColumnsType[];
    rows: RowsType[];
    createdAt: Date;
    attachments: AttachmentsType[];
  };
  type User = {
    id: string;
    email: string;
    name: string;
    avatar: string;
    createdAt: Date;
    tables: TablesType[];
  };

  const router = useRouter();
  const [islogged, setIslogged] = useState<boolean>(false);
  const [loggeduser, setLoggeduser] = useState<User | undefined>();
  const [selectedTable, setSelectedTable] = useState<number>();

  const userId = getCookie("X-AUTH-B");

  async function handleClick() {
    console.log(loggeduser?.tables);
  }

  function handleTableClick(index: number) {
    setSelectedTable(index);
  }

  useEffect(() => {
    async function getLoggedUser() {
      try {
        const response = await getUser(userId);
        setLoggeduser(response);
      } catch (error) {
        setLoggeduser(undefined);
      }
    }
    getLoggedUser();
  }, []);

  useEffect(() => {
    const checkToken = async () => {
      const token = getCookie("X-AUTH-A");
      if (!token) {
        router.push("/login");
        return;
      }

      const valid = await isTokenValid(token);
      if (!valid) {
        router.push("/login");
      }
      setIslogged(true);
    };
    checkToken();
  }, [router]);

  return (
    <div className="flex ">
      <SideBarTables
        styles=""
        tables={loggeduser?.tables}
        onClick={handleTableClick}
      />
      {islogged && (
        <div>
          <h1>dashboard</h1>
          <button onClick={handleClick}>clica ai</button>
        </div>
      )}
    </div>
  );
}
