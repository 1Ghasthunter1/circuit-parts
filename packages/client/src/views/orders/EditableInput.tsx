import { useState } from "react";
import { string } from "yup/lib/locale";
import TitleTextOptions from "~/components/orders/order/TitleTextOptions";

interface IProps {
  originalValue: string;
  placeholder?: string;
}
const EditableInput = ({ originalValue, placeholder }: IProps) => {
  const [showInput, setShowInput] = useState<boolean>(false);
  const [input, setInput] = useState<{
    originalValue: string;
    currentValue: string;
  }>({ originalValue, currentValue: originalValue });

  const save = () => setInput({ ...input, originalValue: input.currentValue });
  const cancel = () =>
    setInput({ ...input, currentValue: input.originalValue });

  const handleKeypress = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      save();
      setShowInput(false);
    } else if (e.key === "Enter") {
      cancel();
      setShowInput(false);
    }
  };

  return (
    <div className="text-2xl font-bold bg-transparent -ml-1 rounded-lg inline-block outline-none">
      {showInput ? (
        <div className="flex w-full content-center">
          <input
            value={input.currentValue}
            placeholder={placeholder || ""}
            className="ring-blue-600 px-2 py-1 ring-[1.5px] rounded-lg
          outline-none bg-transparent hover:bg-transparent"
            onKeyDown={(e) => handleKeypress(e)}
            onChange={(e) =>
              setInput({ ...input, currentValue: e.target.value })
            }
          />
          <div className="pl-3 w-min h-full my-auto">
            <TitleTextOptions
              onSave={() => {
                setShowInput(false);
                save();
              }}
              onCancel={() => {
                setShowInput(false);
                cancel();
              }}
            />
          </div>
        </div>
      ) : (
        <div
          className="hover:bg-blue-100 px-2 py-1 rounded-lg cursor-pointer"
          onClick={() => {
            setShowInput(true);
          }}
        >
          {input.originalValue}
        </div>
      )}
    </div>
  );
};

export default EditableInput;
