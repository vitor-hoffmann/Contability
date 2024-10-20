import React from "react";
import SimpleText from "./SimpleTextComponent";

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

interface AttachmentProps {
  onClick: (index: number) => void;
  styles?: string;
  attachments: AttachmentsType[] | undefined;
}

const Attachment: React.FC<AttachmentProps> = ({
  styles,
  onClick,
  attachments,
}) => {
  return (
    <div className={`${styles ?? ""}`}>
      {attachments && attachments.length > 0 ? (
        attachments.map((attachment, index) => (
          <div
            key={attachment.id}
            onClick={() => onClick(index)}
            className="attachment-item size-fit"
          >
            <SimpleText
              message={`${index + 1} - ${`Attachment URL: ${attachment.url}`}`}
            />
          </div>
        ))
      ) : (
        <SimpleText message={"No attachments available."} />
      )}
    </div>
  );
};

export default Attachment;
