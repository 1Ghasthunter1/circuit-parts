import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import OrderItemsTable from "~/components/orders/projectOrders/OrdersItemTable";
import OrderStatusBox from "~/components/orders/projectOrders/OrderStatusBox";
import OrderTotals from "~/components/orders/projectOrders/OrderTotals";
import Button from "~/elements/Button";
import TopLeftRightAndMiddle from "~/layouts/TopLeftRightAndMiddle";
import { fetchOrder, updateOrder } from "~/services/ordersService";
import { orderState } from "~/state/state";
import { IValidatedOrder } from "~/types/orderTypes";
import EditableInput from "./EditableInput";

const OrderView = () => {
  const { id } = useParams();

  if (!id) return null;

  const orderQuery = useQuery(["order", id], () => fetchOrder(id));
  const orderEditMutation = useMutation((order: IValidatedOrder) =>
    updateOrder(order)
  );

  const order = orderQuery.data;

  useEffect(() => (orderState.order = order || null), [order]);

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
      {order && editTitle ? (
        <TopLeftRightAndMiddle
          topLeftContent={
            <div className="w-full">
              <div className="mb-1">
                <EditableInput
                  originalValue={editTitle}
                  placeholder="Enter Title Here"
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
            <OrderItemsTable orderItems={order.items} />
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
