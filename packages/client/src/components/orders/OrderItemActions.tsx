import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import Button from "~/elements/Button";
import { deleteOrderItemById } from "~/services/ordersService";
import { orderState } from "~/state/state";
import { OrderItem } from "~/types/orderTypes";
import { useSnapshot } from "valtio";

const OrderItemActions = ({
  orderItem,
  onDelete,
  onSave,
  disableSave,
  disableDelete,
}: {
  orderItem: OrderItem;
  onDelete: (event: unknown) => void;
  onSave: (event: unknown) => void;
  disableSave?: boolean;
  disableDelete?: boolean;
}) => {
  const order = orderState.order;
  const orderSnap = useSnapshot(orderState).order;
  const deleteMutation = useMutation(
    async () => {
      deleteOrderItemById(orderItem.id);
    },
    {
      onMutate: async () => {
        if (order && orderSnap) {
          order.items = orderSnap.items.filter(
            (loopItem) => loopItem.id !== orderItem.id
          );
        }
      },
      onError: async () => {
        if (order && orderSnap) {
          order.items = orderSnap.items.concat(orderItem);
        }
        toast.error("Couldn't delete order item");
      },
      onSuccess: async () => toast.success("Deleted order item"),
    }
  );
  return (
    <div className="flex space-x-1">
      <Button
        iconName="check"
        size="sm"
        color="blue"
        style="secondary"
        disabled={disableSave}
        onClick={(e) => {
          onSave(e);
        }}
      />
      <Button
        iconName="trash"
        size="sm"
        color="red"
        style="secondary"
        disabled={disableDelete}
        onClick={(e) => {
          onDelete(e);
          deleteMutation.mutate();
          if (onDelete) onDelete(e);
        }}
      />
    </div>
  );
};

export default OrderItemActions;
