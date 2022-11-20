import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useSnapshot } from "valtio";
import OrderItemsTable from "~/components/orders/OrderItemsTable";
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
import OrderSaveStatus from "~/components/orders/OrderSaveStatus";
import {
  orderError,
  orderSave,
  orderSaved,
} from "~/utils/orders/orderSaveStatus";
import BackButton from "~/components/navigation/BackButton";

const OrderView = () => {
  const [newItems, setNewItems] = useState<string[]>([]);
  const [showStatus, setShowStatus] = useState<boolean>(false);
  const order = useSnapshot(orderState).order;
  const { id } = useParams();

  if (!id) return null;

  const orderQuery = useQuery(["order", id], () => fetchOrder(id));
  const orderEditMutation = useMutation(
    async (order: Order) => await updateOrder(order),
    {
      onMutate: (newOrder) => {
        orderSave();
        orderState.order = { ...newOrder, items: order?.items || [] };
      },
      onSuccess: () => {
        orderSaved();
      },
      onError: () => {
        toast.error("Something went wrong when saving the order.");
        orderError();
      },
    }
  );

  const apiOrder = orderQuery.data;

  useEffect(() => {
    orderState.order = apiOrder || null;
  }, [apiOrder]);

  return (
    <>
      {order ? (
        <TopLeftRightAndMiddle
          topLeftContent={
            <div className="w-full">
              <div>
                <BackButton />
              </div>
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

              <div className="w-min">
                <div className="group relative">
                  <div onClick={() => setShowStatus(!showStatus)}>
                    <OrderStatusBox status={order.status} size="sm" />
                  </div>

                  <div className="absolute opacity-0 -z-50 group-hover:opacity-100 group-hover:z-50 transition duration-100 top-1/2 transform -right-2  translate-x-full -translate-y-1/2 px-4 py-2 bg-gray-700 rounded-lg text-center text-white text-sm after:content-[''] after:absolute after:-translate-y-1/2 after:top-1/2 after:right-[99%] after:border-8 after:rotate-90 after:border-x-transparent after:border-b-transparent after:border-t-gray-700">
                    <div className="flex flex-col items-center space-y-2">
                      <span
                        onClick={() =>
                          orderEditMutation.mutate({ ...order, status: "open" })
                        }
                      >
                        <OrderStatusBox status="open" size="sm" />
                      </span>
                      <span
                        onClick={() =>
                          orderEditMutation.mutate({
                            ...order,
                            status: "ordered",
                          })
                        }
                      >
                        <OrderStatusBox status="ordered" size="sm" />
                      </span>
                      <span
                        onClick={() =>
                          orderEditMutation.mutate({
                            ...order,
                            status: "received",
                          })
                        }
                      >
                        <OrderStatusBox status="received" size="sm" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-gray-400 font-bold flex items-center">
                Vendor:
                <EditableInput<string>
                  value={order.vendor}
                  placeholder="Add vendor"
                  hideButtons
                  emptyType="text"
                  componentStyle=" "
                  validatorFn={(val) => (val ? val.length > 0 : false)}
                  onSave={(value) => {
                    if (value) {
                      const newOrder: PopulatedOrder = {
                        ...order,
                        vendor: value,
                      };
                      orderState.order = newOrder;
                      orderEditMutation.mutate(newOrder);
                    }
                  }}
                />
              </div>
              <div className="text-gray-400 ">
                Created {order.creationDate.toLocaleDateString("en-us")}
              </div>
            </div>
          }
          topRightContent={
            <div className="h-full flex flex-col">
              <div className="ml-auto">
                <OrderSaveStatus />
              </div>

              <div className="mt-auto ml-auto">
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
            <div className="flex  my-6 space-x-10 w-full ">
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
        <div></div>
      )}
    </>
  );
};

export default OrderView;
