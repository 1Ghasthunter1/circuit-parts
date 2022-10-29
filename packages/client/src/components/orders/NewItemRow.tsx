import { useEffect, useState } from "react";
import Button from "~/elements/Button";
import EditableInput from "~/elements/EditableInput";
import { OrderItemToServer } from "~/types/orderTypes";
import {
  object,
  number,
  string,
  ObjectSchema,
  AnySchema,
  ValidationError,
} from "yup";

const NewItemRow = () => {
  interface INewItem
    extends Partial<Omit<OrderItemToServer, "quantity" | "unitCost">> {
    quantity?: string;
    unitCost?: string;
  }
  const [inputState, setInputState] = useState<INewItem>({});
  const [dataOk, setDataOk] = useState<boolean>(false);

  const itemSchema: ObjectSchema<Record<keyof OrderItemToServer, AnySchema>> =
    object({
      partNumber: string().required().defined(),
      quantity: number().integer().required().positive(),
      unitCost: number().required().min(0),
      vendorUrl: string().url(),
      description: string().max(255),
      notes: string().max(500),
    });

  useEffect(() => {
    console.log(inputState);
    itemSchema
      .validate(inputState, { abortEarly: false })
      .then(() => {
        console.log("schema checks out!");
        setDataOk(true);
      })
      .catch((err: ValidationError) => {
        err.inner.forEach((e) => {
          setDataOk(false);
          console.log(e.message, e.path);
        });
      });
  }, [inputState]);

  return (
    <tr className="border-gray-200 border-t odd:bg-gray-50 even:bg-gray-100 hover:bg-gray-200">
      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500 h-full">
        <EditableInput
          value={inputState.partNumber || ""}
          onChangeFunc={(e) => {
            setInputState({ ...inputState, partNumber: e.target.value });
          }}
          placeholder="Part Number"
          hideButtons={true}
          componentStyle={"text-md font-bold"}
        />
      </td>
      <td className={"whitespace-nowrap px-3 py-2 text-sm text-gray-500"}>
        <EditableInput
          value={inputState.quantity || ""}
          onChangeFunc={(e) => {
            setInputState({ ...inputState, quantity: e.target.value });
          }}
          placeholder="Qty"
          hideButtons={true}
          componentStyle={"text-md font-bold"}
        />
      </td>
      <td className={"whitespace-nowrap px-3 py-2 text-sm text-gray-500"}>
        <EditableInput
          value={inputState.description || ""}
          onChangeFunc={(e) => {
            setInputState({ ...inputState, description: e.target.value });
          }}
          placeholder="Description"
          hideButtons={true}
          componentStyle={"text-md font-bold"}
        />
      </td>
      <td className={"whitespace-nowrap px-3 py-2 text-sm text-gray-500"}>
        <EditableInput
          value={inputState.unitCost || ""}
          onChangeFunc={(e) => {
            setInputState({ ...inputState, unitCost: e.target.value });
          }}
          placeholder="Unit Cost"
          hideButtons={true}
          componentStyle={"text-md font-bold"}
        />
      </td>
      <td className={"whitespace-nowrap px-3 py-2 text-sm text-gray-500"}></td>
      <td className={"whitespace-nowrap px-3 py-2 text-sm text-gray-500"}>
        <EditableInput
          value={inputState.notes || ""}
          onChangeFunc={(e) => {
            setInputState({ ...inputState, notes: e.target.value });
          }}
          placeholder="Notes"
          hideButtons={true}
          componentStyle={"text-md font-bold"}
        />
      </td>
      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500 space-x-1">
        <Button
          iconName="check"
          style="secondary"
          color="blue"
          size="sm"
          disabled={!dataOk}
        />
        <Button iconName="x" style="secondary" color="red" size="sm" />
      </td>
    </tr>
  );
};

export default NewItemRow;
