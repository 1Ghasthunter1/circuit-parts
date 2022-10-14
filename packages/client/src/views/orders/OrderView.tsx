import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import TitleTextOptions from "~/components/orders/order/TitleTextOptions";
import OrderItemsTable from "~/components/orders/projectOrders/OrdersItemTable";
import OrderStatusBox from "~/components/orders/projectOrders/OrderStatusBox";
import TopLeftRightAndMiddle from "~/layouts/TopLeftRightAndMiddle";
import { fetchOrder } from "~/services/ordersService";

const OrderView = () => {
  const ref = useRef(null);
  const [editTitle, setEditTitle] = useState<string>("");
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
      {order ? (
        <TopLeftRightAndMiddle
          topLeftContent={
            <div className="w-full">
              <div className="text-2xl font-bold w-full relative mb-2">
                <input
                  ref={ref}
                  value={editTitle}
                  onFocus={() => setIsEditing(true)}
                  onKeyDown={onKeyDown}
                  className={`bg-transparent p-2 -ml-2 rounded-lg hover:bg-blue-100 inline-block outline-none ${
                    isEditing && "ring-gray-900 ring-[1.5px] hover:bg-transparent"
                  }`}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                {isEditing && (
                  <div className="absolute top-1/2 -translate-y-1/2 right-0 pr-3">
                    <TitleTextOptions
                      setIsEditing={(editing: boolean) => setIsEditing(editing)}
                      onSave={() => console.log("saved")}
                      onCancel={() => console.log("cancelled")}
                    />
                  </div>
                )}
              </div>
              <OrderStatusBox status={order.status} size="sm"/>
              <div className="text-gray-400 font-bold">
                Vendor: {order.vendor}
              </div>
              <div className="text-gray-400 ">
                Created {order.creationDate.toLocaleDateString("en-us")}
              </div>
            </div>
          }
        >
          <OrderItemsTable orderItems={order.items} />
        </TopLeftRightAndMiddle>
      ) : (
        <div>asd</div>
      )}
    </>
  );
};

export default OrderView;
