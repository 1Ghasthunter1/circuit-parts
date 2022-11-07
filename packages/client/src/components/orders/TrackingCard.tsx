import { Order } from "~/types/orderTypes";

const TrackingCard = ({ order }: { order: Order }) => {
  return (
    <section className="shadow rounded-lg ring-1 ring-gray-200">
      <h2 className="sr-only">Status Info</h2>

      <div className="rounded-lg bg-white py-6 px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-0 lg:py-8">
        <dl className="grid grid-cols-1 gap-6 text-sm sm:grid-cols-2 md:gap-x-8 lg:col-span-5 lg:pl-8">
          <div>
            <dt className="font-medium text-gray-900">Carrier</dt>
            <dd className="text-gray-500">
              <span className="block whitespace-nowrap">USPS</span>
            </dd>
          </div>
        </dl>

        <dl className="mt-8 divide-y divide-gray-200 text-sm lg:col-span-7 lg:mt-0 lg:pr-8">
          <div>stuff</div>
        </dl>
      </div>
    </section>
  );
};

export default TrackingCard;
