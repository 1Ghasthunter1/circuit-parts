import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { useSnapshot } from "valtio";
import Button from "~/elements/Button";
import { updateOrder } from "~/services/ordersService";
import { orderState } from "~/state/state";
import { Order } from "~/types/orderTypes";
import OrderStatusProgress from "./OrderStatusProgress";
import TrackingModal from "./TrackingModal";
import TrackingNumber from "./TrackingNumber";

const TrackingCard = () => {
  const queryClient = useQueryClient();
  const order = useSnapshot(orderState).order;
  const [modalVis, setModalVis] = useState<boolean>(false);

  const orderEditMutation = useMutation(
    async (order: Order) => {
      return await updateOrder(order);
    },
    {
      onMutate: (newOrder) => {
        orderState.order = { ...newOrder, items: order?.items || [] };
      },
      onSuccess: (newOrder) => {
        toast.success(
          <span>
            Saved <b>{newOrder.orderNumber}</b>
          </span>
        );
        setModalVis(false);
      },
      onError: () => {
        toast.error("Something went wrong when saving the order.");
      },
      onSettled: () => queryClient.invalidateQueries(["order", order?.id]),
    }
  );

  if (!order) return null;
  return (
    <section className="h-full shadow rounded-lg ring-1 ring-gray-200 bg-white p-6 lg:px-8 lg:py-8 relative">
      <div className="rounded-lg lg:grid lg:grid-cols-12 ">
        <dl className="grid grid-cols-1 gap-6 text-sm sm:grid-cols-2 lg:col-span-5 ">
          <div>
            <dt className="font-medium text-gray-900">Carrier</dt>
            <dd className="text-gray-500">
              <span className="block whitespace-nowrap">
                {order.tracking?.carrier || "No carrier specified"}
              </span>
            </dd>
          </div>
        </dl>

        <dl className="grid grid-cols-1 gap-6 text-sm sm:grid-cols-2 md:gap-x-8 lg:col-span-5 lg:pl-8">
          <div>
            <dt className="font-medium text-gray-900 whitespace-nowrap">
              Tracking Info
            </dt>
            <dd className="text-gray-500">
              <span className="block whitespace-nowrap cursor-pointer">
                {order.tracking?.carrier && order.tracking.trackingNumber ? (
                  <TrackingNumber {...order.tracking} />
                ) : (
                  "No tracking number specified"
                )}
              </span>
            </dd>
          </div>
        </dl>
      </div>
      <div className="mb-8 mt-8 flex justify-center	">
        <div className="">
          <OrderStatusProgress status={order.status} />
        </div>
      </div>
      <span className="absolute right-0 bottom-0 mb-4 mr-5">
        <Button
          color="blue"
          style="secondary"
          iconName="box"
          onClick={() => setModalVis(true)}
        >
          Update Tracking
        </Button>
      </span>
      <TrackingModal
        order={order}
        modalVisibility={modalVis}
        setModalVisibility={setModalVis}
        onSubmit={(values) => {
          const newOrder: Order = { ...order, tracking: { ...values } };
          orderEditMutation.mutate(newOrder);
        }}
      />
    </section>
  );
};

export default TrackingCard;
