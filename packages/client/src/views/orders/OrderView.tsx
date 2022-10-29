import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useSnapshot } from "valtio";
import NewOrderItemModal from "~/components/orders/NewOrderItemModal";
import OrderItemsTable from "~/components/orders/OrdersItemTable";
import OrderStatusBox from "~/components/orders/OrderStatusBox";
import OrderTotals from "~/components/orders/OrderTotals";
import Button from "~/elements/Button";
import TopLeftRightAndMiddle from "~/layouts/TopLeftRightAndMiddle";
import { fetchOrder, updateOrder } from "~/services/ordersService";
import { orderState, projectSelectState } from "~/state/state";
import { IValidatedOrder, Order } from "~/types/orderTypes";
import EditableInput from "./EditableInput";

const OrderView = () => {
  const [newItemModalVis, setNewItemModalVis] = useState<boolean>(false);
  const order = useSnapshot(orderState).order;
  const { id } = useParams();

  if (!id) return null;

  const orderQuery = useQuery(["order", id], () => fetchOrder(id));
  const orderEditMutation = useMutation(
    async (order: IValidatedOrder) => await updateOrder(order),
    {
      onSuccess: (newOrder) => {
        toast.success(
          <span>
            Saved <b>{newOrder.orderNumber}</b>
          </span>
        );
      },
      onError: () => {
        toast.error("Something went wrong when saving the order.");
      },
      onSettled: () => orderQuery.refetch(),
    }
  );

  const apiOrder = orderQuery.data;

  useEffect(() => {
    orderState.order = apiOrder || null;
    return undefined;
  }, [apiOrder]);

  const onKeyDown = (
    event: React.ChangeEvent<HTMLInputElement> &
      React.KeyboardEvent<HTMLElement>
  ) => {
    if (event.key === "Enter" || event.key === "Escape") {
      event.target.blur();
    }
  };

  return (
    <>
      {order ? (
        <TopLeftRightAndMiddle
          topLeftContent={
            <div className="w-full">
              <div className="mb-1">
                <EditableInput
                  value={order.orderNumber}
                  placeholder="Enter Title Here"
                  onSave={(value) => {
                    const newOrder: Order = { ...order, orderNumber: value };
                    orderEditMutation.mutate(newOrder);
                  }}
                />
              </div>
              <OrderStatusBox status={order.status} size="sm" />
              <div className="text-gray-400 font-bold">
                Vendor: {order.vendor}
              </div>
              <div className="text-gray-400 ">
                Created {order.creationDate.toLocaleDateString("en-us")}
              </div>
            </div>
          }
          topRightContent={
            <div className="h-full flex">
              <div className="mt-auto">
                <Button iconName="plus" color="green">
                  Add Item
                </Button>
              </div>
            </div>
          }
        >
          <>
            <OrderItemsTable orderItems={[...order.items]} />
            <div className="mt-6">
              <OrderTotals order={order} />
            </div>
          </>
        </TopLeftRightAndMiddle>
      ) : (
        <div>asd</div>
      )}
    </>
  );
};

export default OrderView;
