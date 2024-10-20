import Button from "./ButtonComponent";
import SimpleText from "./SimpleTextComponent";

interface ConfirmationPopupProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full flex flex-col gap-8 justify-center items-center">
        <SimpleText styles="text-black" message={message} />
        <div className="flex gap-8">
          <Button
            onClick={onConfirm}
            styles="px-4 py-2 bg-blue-600 hover:bg-blue-800 text-slate-100 rounded"
            text="Confirm"
          />
          <Button
            onClick={onCancel}
            styles="px-4 py-2 bg-gray-400 hover:bg-gray-300 hover:text-slate-700 text-gray-700 rounded"
            text="Cancel"
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
