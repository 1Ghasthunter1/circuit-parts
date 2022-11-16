import React, { useEffect, useRef, useState } from "react";
import TitleTextOptions from "~/components/orders/TitleTextOptions";

interface IProps {
  placeholder?: string;
  onChangeFunc?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hideButtons?: boolean;
  emptyType?: "box" | "text" | "none";
  inputStyle?: string;
  notEditable?: boolean;
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
  notEditable,
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

  const NotInputState = () => {
    const getStyle = () => {
      if (notEditable) return null;
      switch (emptyType) {
        case "box":
          return "bg-white shadow-inner border-[1.5px] ";
        case "text":
          return "";
      }
    };

    return (
      <div
        className={`h-full w-full ${
          !notEditable ? "hover:bg-blue-200 cursor-pointer" : null
        } px-2 py-1 rounded-lg  ${getStyle()} `}
        onClick={!notEditable ? () => setShowInput(true) : () => null}
      >
        {input.originalValue === "" ? (
          <span className="text-gray-300">
            {!notEditable ? placeholder : null}
          </span>
        ) : aggregationFn ? (
          aggregationFn(input.originalValue)
        ) : (
          input.originalValue
        )}
      </div>
    );
  };

  return (
    <div
      className={`${
        componentStyle
          ? componentStyle
          : "text-2xl font-bold -ml-1  inline-block outline-none"
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
      ) : emptyType === "none" && input.originalValue === "" ? null : (
        // Handles cases where input is empty but emptyType is not none
        <NotInputState />
      )}
    </div>
  );
};

export default EditableInput;
