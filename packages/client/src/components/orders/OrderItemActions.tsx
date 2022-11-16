import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import Button from "~/elements/Button";
import { deleteOrderItemById } from "~/services/ordersService";
import { OrderItem } from "~/types/orderTypes";

const OrderItemActions = ({ orderItem }: { orderItem: OrderItem }) => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(
    async () => deleteOrderItemById(orderItem.id),
    {
      onSuccess: async () => toast.success("Deleted order item"),
      onSettled: async () =>
        queryClient.invalidateQueries(["order", orderItem.order]),
    }
  );
  return (
    <div className="flex space-x-1">
      <Button
        iconName="check"
        size="sm"
        color="blue"
        style="secondary"
        onClick={() => deleteMutation.mutate()}
      />
      <Button
        iconName="trash"
        size="sm"
        color="red"
        style="secondary"
        onClick={() => null}
      />
    </div>
  );
};

export default OrderItemActions;
