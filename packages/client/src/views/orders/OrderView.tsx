import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useSnapshot } from "valtio";
import OrderItemsTable from "~/components/orders/OrdersItemTable";
import OrderStatusBox from "~/components/orders/OrderStatusBox";
import OrderTotals from "~/components/orders/OrderTotals";
import Button from "~/elements/Button";
import TopLeftRightAndMiddle from "~/layouts/TopLeftRightAndMiddle";
import { fetchOrder, updateOrder } from "~/services/ordersService";
import { orderState } from "~/state/state";
import { Order, PopulatedOrder } from "~/types/orderTypes";
import EditableInput from "~/elements/EditableInput";
import EditableInput2 from "./EditableInput";

import { v4 as uuidv4 } from "uuid";
import TrackingCard from "~/components/orders/TrackingCard";
import { number } from "yup";

const OrderView = () => {
  const [newItems, setNewItems] = useState<string[]>([]);
  const order = useSnapshot(orderState).order;
  const { id } = useParams();

  if (!id) return null;

  const orderQuery = useQuery(["order", id], () => fetchOrder(id));
  const orderEditMutation = useMutation(
    async (order: Order) => await updateOrder(order),
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

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <>
      {order ? (
        <TopLeftRightAndMiddle
          topLeftContent={
            <div className="w-full">
              <div className="mb-1">
                <EditableInput2
                  value={order.orderNumber}
                  placeholder="Enter Title Here"
                  onSave={(value) => {
                    const newOrder: Order = { ...order, orderNumber: value };
                    orderEditMutation.mutate(newOrder);
                  }}
                />
              </div>
              <OrderStatusBox status={order.status} size="sm" />
              <div className="text-gray-400 font-bold flex items-center">
                Vendor:
                <EditableInput<string>
                  value={order.vendor}
                  placeholder="Add vendor"
                  hideButtons
                  emptyType="text"
                  componentStyle=" "
                  validatorFn={(val) => val.length > 0}
                  onSave={(value) => {
                    const newOrder: PopulatedOrder = {
                      ...order,
                      vendor: value,
                    };
                    orderState.order = newOrder;
                    orderEditMutation.mutate(newOrder);
                  }}
                />
              </div>
              <div className="text-gray-400 ">
                Created {order.creationDate.toLocaleDateString("en-us")}
              </div>
            </div>
          }
          topRightContent={
            <div className="h-full flex">
              <div className="mt-auto">
                <Button
                  iconName="plus"
                  color="green"
                  onClick={() => {
                    const newId = uuidv4();
                    setNewItems(newItems.concat(newId));
                  }}
                >
                  Add Item
                </Button>
              </div>
            </div>
          }
        >
          <>
            <div className="flex  my-6 space-x-12 w-full ">
              <div className="w-full self-stretch">
                <TrackingCard />
              </div>
              <div className="self-stretch w-full">
                <OrderTotals editMutation={orderEditMutation} />
              </div>
            </div>
            <OrderItemsTable
              newItemStuff={{ newItems, setNewItems }}
              orderItems={[...order.items]}
            />
          </>
        </TopLeftRightAndMiddle>
      ) : (
        <div>asd</div>
      )}
    </>
  );
};

export default OrderView;
