import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSnapshot } from "valtio";
import { orderState } from "~/state/state";
import { Order } from "~/types/orderTypes";

const TrackingCard = () => {
  const order = useSnapshot(orderState).order;
  if (!order) return null;
  return (
    <section className="h-full shadow rounded-lg ring-1 ring-gray-200">
      <h2 className="sr-only">Status Info</h2>

      <div className="h-full rounded-lg bg-white py-6 px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-0 lg:py-8">
        <dl className="grid grid-cols-1 gap-6 text-sm sm:grid-cols-2 md:gap-x-8 lg:col-span-5 lg:pl-8">
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
    </section>
  );
};

export default TrackingCard;
