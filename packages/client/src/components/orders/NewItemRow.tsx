import { useEffect, useState } from "react";
import Button from "~/elements/Button";
import EditableInput from "~/elements/EditableInput";
import { OrderItem, OrderItemToServer } from "~/types/orderTypes";
import {
  object,
  number,
  string,
  ObjectSchema,
  AnySchema,
  ValidationError,
} from "yup";
import { useMutation } from "react-query";
import { createOrderItem } from "~/services/ordersService";
import { orderState } from "~/state/state";
import { useSnapshot } from "valtio";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { orderItemSchema } from "~/utils/orders/orderItemSchema";
import {
  orderError,
  orderSave,
  orderSaved,
} from "~/utils/orders/orderSaveStatus";

const NewItemRow = ({
  id,
  newItems,
  setNewItems,
}: {
  id: string;
  newItems: string[];
  setNewItems: (newItems: string[]) => void;
}) => {
  interface INewItem
    extends Partial<Omit<OrderItemToServer, "quantity" | "unitCost">> {
    quantity?: string;
    unitCost?: string;
  }
  const [inputState, setInputState] = useState<INewItem>({});
  const [cleanState, setCleanState] = useState<OrderItemToServer | null>(null);

  const orderSnapshot = useSnapshot(orderState, { sync: true }).order;

  useEffect(() => {
    orderItemSchema
      .validate(inputState, { abortEarly: false })
      .then((cleanState: OrderItemToServer) => {
        setCleanState(cleanState);
      })
      .catch((err: ValidationError) => {
        err.inner.forEach((e) => {
          setCleanState(null);
        });
      });
  }, [inputState]);

  const newItemTempId = uuidv4();

  const createMutation = useMutation(
    async () => {
      if (orderSnapshot && cleanState) {
        return await createOrderItem(orderSnapshot.id, cleanState);
      }
    },
    {
      onMutate: async () => {
        if (orderSnapshot && orderState.order && cleanState) {
          orderState.order.items = orderSnapshot.items.concat({
            ...cleanState,
            id: newItemTempId,
            order: orderSnapshot.id,
          });
          setNewItems(newItems.filter((itemId) => itemId !== id));
          orderSave();
        }
      },
      onSuccess: async (response) => {
        if (orderSnapshot && orderState.order && response) {
          orderState.order.items = orderSnapshot.items.concat(response.data);
          toast.success(
            <span>
              Added <b>{cleanState?.partNumber}</b> to order
            </span>
          );
        }
        orderSaved();
      },
      onError: async () => {
        toast.error("Couldn't add order item");
        setNewItems(newItems);
        orderError();
      },
      onSettled: async () => {},
    }
  );

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className="table-row border-gray-200 border-t odd:bg-gray-50 even:bg-gray-100 hover:bg-gray-200">
      <div className="table-cell whitespace-nowrap px-3 py-2 text-sm text-gray-500 ">
        <EditableInput
          value={inputState.partNumber || ""}
          onChangeFunc={(e) => {
            setInputState({ ...inputState, partNumber: e.target.value });
          }}
          placeholder="Part Number"
          hideButtons={true}
          emptyType="box"
          componentStyle="text-md font-bold"
        />
      </div>
      <div className="table-cell whitespace-nowrap px-3 py-2 text-sm text-gray-500">
        <EditableInput
          value={inputState.quantity || ""}
          onChangeFunc={(e) => {
            setInputState({ ...inputState, quantity: e.target.value });
          }}
          placeholder="Qty"
          emptyType="box"
          hideButtons={true}
          componentStyle="text-md"
        />
      </div>
      <div className="table-cell whitespace-nowrap px-3 py-2 text-sm text-gray-500">
        <EditableInput
          value={inputState.description || ""}
          onChangeFunc={(e) => {
            setInputState({ ...inputState, description: e.target.value });
          }}
          placeholder="Description"
          hideButtons={true}
          emptyType="box"
          componentStyle="text-md"
        />
      </div>
      <div className="table-cell whitespace-nowrap px-3 py-2 text-sm text-gray-500">
        <EditableInput
          value={inputState.unitCost || ""}
          onChangeFunc={(e) => {
            setInputState({ ...inputState, unitCost: e.target.value });
          }}
          placeholder="Unit Cost"
          hideButtons={true}
          emptyType="box"
          componentStyle="text-md"
        />
      </div>
      <div className="table-cell whitespace-nowrap px-3 py-2 text-sm text-gray-500">
        {cleanState
          ? formatter.format(cleanState.quantity * cleanState.unitCost)
          : ""}
      </div>
      <div className="table-cell whitespace-nowrap px-3 py-2 text-sm text-gray-500">
        <EditableInput
          value={inputState.notes || ""}
          onChangeFunc={(e) => {
            setInputState({ ...inputState, notes: e.target.value });
          }}
          placeholder="Notes"
          hideButtons={true}
          emptyType="box"
          componentStyle="text-md"
        />
      </div>
      <div className="table-cell whitespace-nowrap px-3 space-x-1 py-2 text-sm text-gray-500">
        <Button
          iconName="check"
          style="secondary"
          color="blue"
          size="sm"
          disabled={!cleanState}
          onClick={() => createMutation.mutate()}
          isLoading={createMutation.isLoading}
        />
        <Button
          iconName="x"
          style="secondary"
          color="red"
          size="sm"
          onClick={() =>
            setNewItems(newItems.filter((itemId) => itemId !== id))
          }
        />
      </div>
    </div>
  );
};

export default NewItemRow;
