import React, { useEffect, useRef, useState } from "react";
import TitleTextOptions from "~/components/orders/TitleTextOptions";

interface IProps {
  placeholder?: string;
  onChangeFunc?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hideButtons?: boolean;
  emptyType?: "box" | "text";
  inputStyle?: string;
  componentStyle?: string;
}
const EditableInput = <T extends string | number>({
  value,
  placeholder,
  onChangeFunc,
  onSave,
  hideButtons,
  emptyType,
  inputStyle,
  componentStyle,
  aggregationFn,
  validatorFn,
}: IProps & {
  value: T;
  onSave?: (val: T) => void;
  aggregationFn?: (val: T) => string | number;
  validatorFn?: (val: T) => boolean;
}) => {
  const [showInput, setShowInput] = useState<boolean>(false);
  const [input, setInput] = useState<{
    originalValue: T;
    currentValue: T;
  }>({ originalValue: value, currentValue: value });
  const [isValid, setIsValid] = useState<boolean>(false);

  const save = () => {
    setShowInput(false);
    if (!(input.originalValue === input.currentValue)) {
      setInput({ ...input, originalValue: input.currentValue });
      if (onSave) onSave(input.currentValue);
    }
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

  useEffect(() => {
    validatorFn
      ? setIsValid(validatorFn(input.currentValue))
      : setIsValid(true);
  }, [input.currentValue]);

  return (
    <div
      className={`${
        componentStyle
          ? componentStyle
          : "text-2xl font-bold bg-transparent -ml-1 rounded-lg inline-block outline-none"
      } bg-transparent rounded-lg outline-none`}
    >
      {showInput ? (
        <>
          <input
            value={input.currentValue}
            placeholder={placeholder || ""}
            autoFocus
            onBlur={isValid ? save : cancel}
            className={`
            ${
              !isValid
                ? "ring-rose-400 ring-[1.5px] bg-rose-50 text-rose-400 outline-none "
                : ""
            }
              ${
                inputStyle
                  ? inputStyle
                  : "ring-blue-600 px-2 py-1 ring-[1.5px] w-full box-border rounded-lg outline-none bg-transparent "
              }
            `}
            onKeyDown={(e) => handleKeypress(e)}
            onChange={(e) => {
              setInput({ ...input, currentValue: e.target.value as T });
              if (onChangeFunc) {
                onChangeFunc(e);
              }
            }}
          />
          {!hideButtons && (
            <div className="pl-3 w-min h-full my-auto">
              <TitleTextOptions
                onSave={() => save()}
                onCancel={() => cancel()}
              />
            </div>
          )}
        </>
      ) : (
        <div
          className={`hover:bg-blue-200 px-2 py-1 rounded-lg cursor-pointer ${
            input.originalValue === "" &&
            emptyType !== "text" &&
            "bg-white shadow-inner border-[1.5px] h-full w-full"
          }
          ${
            input.originalValue === "" &&
            emptyType === "text" &&
            "bg-white h-full w-full"
          }`}
          onClick={() => {
            setShowInput(true);
          }}
        >
          {input.originalValue === "" ? (
            <span className="text-gray-300">{placeholder}</span>
          ) : aggregationFn ? (
            aggregationFn(input.originalValue)
          ) : (
            input.originalValue
          )}
        </div>
      )}
    </div>
  );
};

export default EditableInput;
