import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSnapshot } from "valtio";
import { orderState } from "~/state/state";
import { Order } from "~/types/orderTypes";
import OrderStatusProgress from "./OrderStatusProgress";

const TrackingCard = () => {
  const order = useSnapshot(orderState).order;
  if (!order) return null;
  return (
    <section className="h-full shadow rounded-lg ring-1 ring-gray-200 bg-white p-6 lg:px- lg:py-8">

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
                {order.tracking?.trackingNumber || "No tracking number"}
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
    </section>
  );
};

export default TrackingCard;
