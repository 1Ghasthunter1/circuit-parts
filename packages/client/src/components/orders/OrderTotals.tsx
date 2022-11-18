import { yupToFormErrors } from "formik";
import { UseMutationResult } from "react-query";
import { useSnapshot } from "valtio";
import EditableInput from "~/elements/EditableInput";
import { calculateOrderTotals } from "~/services/ordersService";
import { orderState } from "~/state/state";
import { Order, PopulatedOrder } from "~/types/orderTypes";
import { number } from "yup";

const OrderTotals = ({
  editMutation,
}: {
  editMutation: UseMutationResult<Order, unknown, Order, unknown>;
}) => {
  const order = useSnapshot(orderState).order;
  if (!order) return null;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const { subtotal, total } = calculateOrderTotals(order);

  return (
    <section className="shadow rounded-lg ring-1 ring-gray-200">
      <h2 className="sr-only">Billing Summary</h2>

      <div className="rounded-lg bg-white py-6 px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-0 lg:py-8">
        <dl className="grid grid-cols-1 gap-6 text-sm sm:grid-cols-2 lg:grid-cols-1 md:gap-x-8 lg:col-span-5 lg:pl-8">
          <div>
            <dt className="font-medium text-gray-900">Purchaser</dt>
            <dd className="text-gray-500 w-full">
              <span className="block whitespace-nowrap -ml-2 w-full">
                <EditableInput<string>
                  value={order.purchaser || ""}
                  placeholder="Add purchaser"
                  hideButtons
                  emptyType="text"
                  componentStyle=" "
                  onSave={(value) => {
                    editMutation.mutate({
                      ...order,
                      purchaser: value,
                    });
                  }}
                />
              </span>
            </dd>
            <dt className="font-medium text-gray-900 mt-2">Reimbursed</dt>
            <dd
              className="cursor-pointer"
              onClick={() => {
                editMutation.mutate({
                  ...order,
                  reimbursed: !order.reimbursed,
                });
              }}
            >
              <div className="flex h-5 items-center">
                <input
                  id="reimbursed"
                  name="reimbursex"
                  type="checkbox"
                  checked={order.reimbursed}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-1">Reimbursed</span>
              </div>
            </dd>
          </div>
        </dl>

        <dl className="mt-8 divide-y divide-gray-200 text-sm lg:col-span-7 lg:mt-0 lg:pr-8">
          <div className="flex items-center justify-between pb-4">
            <dt className="text-gray-600 ">Subtotal</dt>
            <dd className="font-medium text-gray-500 bg-gray-100 shadow-inner rounded py-1 px-2 -mb-1">
              {formatter.format(subtotal)}
            </dd>
          </div>
          <div className="flex items-center justify-between py-4">
            <dt className="text-gray-600">Shipping</dt>
            <dd className="font-medium text-gray-900 ml-auto">
              <EditableInput<number>
                value={Number(order.shipping) || 0}
                placeholder="Add shipping"
                hideButtons
                emptyType="text"
                componentStyle=" "
                aggregationFn={(val) => `${formatter.format(val)}`}
                validatorFn={(val) => !isNaN(val)}
                onSave={(value) => {
                  const num =
                    (number()
                      .round("round")
                      .cast(value * 100) || 0) / 100;
                  editMutation.mutate({
                    ...order,
                    shipping: num,
                  });
                }}
              />
            </dd>
          </div>
          <div className="flex items-center justify-between py-4">
            <dt className="text-gray-600">Tax</dt>
            <dd className="font-medium text-gray-900">
              <EditableInput<number>
                value={Number(order.tax) || 0}
                placeholder="Add tax"
                hideButtons
                emptyType="text"
                componentStyle=" "
                aggregationFn={(val) => `${formatter.format(val)}`}
                validatorFn={(val) => !isNaN(val)}
                onSave={(value) => {
                  const num =
                    (number()
                      .round("round")
                      .cast(value * 100) || 0) / 100;

                  editMutation.mutate({
                    ...order,
                    tax: num,
                  });
                }}
              />
            </dd>
          </div>
          <div className="flex items-center justify-between pt-4">
            <dt className="font-medium text-gray-900">Order total</dt>
            <dd className="font-medium text-indigo-600 text-lg">
              {formatter.format(total)}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
};

export default OrderTotals;
