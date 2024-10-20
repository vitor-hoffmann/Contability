"use client";

import { getCookie } from "@/auth/getCookie";
import { isTokenValid } from "@/auth/isTokenValid";
import Attachment from "@/components/AttachmentComponent";
import SideBarTables from "@/components/SidebarTablesListing";
import SimpleText from "@/components/SimpleTextComponent";
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
  const [usertables, setUsertables] = useState<TablesType[] | undefined>();
  const [selectedTable, setSelectedTable] = useState<TablesType | undefined>();

  const userId = getCookie("X-AUTH-B");

  function handleTableClick(index: number) {
    if (usertables) {
      setSelectedTable(usertables[index]);
    }
  }

  function handleSideBarSize() {
    const header = document.getElementById("header");
    const sidebar = document.getElementById("sidebar");

    if (sidebar && header) {
      const headerHeight = header.offsetHeight;
      const viewportHeight = window.innerHeight;
      const sidebarHeight = viewportHeight - headerHeight;

      sidebar.style.height = `${sidebarHeight}px`;
    }
  }

  function handleClickAttachment(index: number) {
    const attachmentUrl = selectedTable?.attachments[index].url;
    console.log(attachmentUrl);
  }

  useEffect(() => {
    window.addEventListener("resize", handleSideBarSize);
    return () => {
      window.removeEventListener("resize", handleSideBarSize);
    };
  }, [window.innerHeight]);

  useEffect(() => {
    async function getLoggedUser() {
      try {
        const response = await getUser(userId);
        setLoggeduser(response);
        setUsertables(response.tables);
      } catch (error) {
        setLoggeduser(undefined);
      }
    }
    getLoggedUser();
    handleSideBarSize();
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
    <div className="flex">
      <div>
        <SideBarTables
          styles=""
          tables={loggeduser?.tables}
          onClick={handleTableClick}
        />
      </div>
      <div
        className={`flex flex-grow items-center ${
          !selectedTable
            ? "justify-center items-center"
            : "justify-between items-start"
        }`}
      >
        {!selectedTable && (
          <p className="text-center">Select or create a table</p>
        )}

        {selectedTable && (
          <>
            <div className="flex justify-around items-center w-full">
              <SimpleText styles="break-word" message={selectedTable?.name} />
            </div>
            <Attachment
              onClick={handleClickAttachment}
              attachments={selectedTable?.attachments}
            />
          </>
        )}
      </div>
    </div>
  );
}
