import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import TitleTextOptions from "~/components/orders/order/TitleTextOptions";
import OrderItemsTable from "~/components/orders/projectOrders/OrdersItemTable";
import OrderStatusBox from "~/components/orders/projectOrders/OrderStatusBox";
import OrderTotals from "~/components/orders/projectOrders/OrderTotals";
import Button from "~/elements/Button";
import TopLeftRightAndMiddle from "~/layouts/TopLeftRightAndMiddle";
import { fetchOrder } from "~/services/ordersService";
import EditableInput from "./EditableInput";

const OrderView = () => {
  const [editTitle, setEditTitle] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { id } = useParams();

  if (!id) return null;

  const orderQuery = useQuery(["order", id], () => fetchOrder(id));

  const order = orderQuery.data;
  useEffect(() => setEditTitle(order?.orderNumber || ""), [order?.orderNumber]);

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
            <div className="w-full h-full">
              <Button iconName="plus" color="green">
                Add Item
              </Button>
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
