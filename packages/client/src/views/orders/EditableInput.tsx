import React, { useState } from "react";
import { string } from "yup/lib/locale";
import TitleTextOptions from "~/components/orders/TitleTextOptions";

interface IProps {
  value: string;
  placeholder?: string;
  onChangeFunc?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave?: (val: string) => void;
}
const EditableInputOrder = ({
  value,
  placeholder,
  onChangeFunc,
  onSave,
}: IProps) => {
  const [showInput, setShowInput] = useState<boolean>(false);
  const [input, setInput] = useState<{
    originalValue: string;
    currentValue: string;
  }>({ originalValue: value, currentValue: value });

  const save = () => {
    setShowInput(false);
    setInput({ ...input, originalValue: input.currentValue });
    if (onSave) onSave(input.currentValue);
  };
  const cancel = () => {
    setShowInput(false);
    setInput({ ...input, currentValue: input.originalValue });
  };

  const handleKeypress = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      cancel();
      setShowInput(false);
    } else if (e.key === "Enter") {
      save();
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
            onChange={(e) => {
              setInput({ ...input, currentValue: e.target.value });
              if (onChangeFunc) onChangeFunc(e);
            }}
          />
          <div className="pl-3 w-min h-full my-auto">
            <TitleTextOptions onSave={() => save()} onCancel={() => cancel()} />
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

export default EditableInputOrder;
