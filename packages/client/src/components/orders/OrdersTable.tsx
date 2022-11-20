import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
  getGroupedRowModel,
} from "@tanstack/react-table";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Order } from "~/types/orderTypes";
import OrderStatusBox from "./OrderStatusBox";
import { useMemo, useState } from "react";
import Button from "~/elements/Button";
import DeleteOrderModal from "../modals/DeleteOrderModal";
import { userState } from "~/state/state";
import { useMutation, UseQueryResult } from "react-query";
import { deleteOrderById } from "~/services/ordersService";
import toast from "react-hot-toast";
import TrackingNumber from "./TrackingNumber";

const OrdersTable = ({
  orders,
  ordersQuery,
}: {
  orders: Order[];
  ordersQuery: UseQueryResult<Order[], unknown>;
}) => {
  const columnHelper = createColumnHelper<Order>();

  const columns = [
    columnHelper.accessor("vendor", {
      header: "Vendor",
      cell: (info) => info.cell.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("orderNumber", {
      header: "Order Number",
      cell: (info) => (
        <Link to={`/orders/${info.row.original.id}`}>
          {info.cell.getValue()}
        </Link>
      ),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("creationDate", {
      header: "Creation Date",
      cell: (info) => <div>{info.getValue().toLocaleDateString("en-US")}</div>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("tracking", {
      header: "Tracking",
      cell: (info) => {
        const tracking = info.cell.getValue();
        if (!tracking) return null;

        return tracking.carrier && tracking.trackingNumber ? (
          <TrackingNumber {...tracking} />
        ) : (
          "No tracking number specified"
        );
      },
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => <OrderStatusBox status={info.getValue()} />,
      footer: (info) => info.column.id,
    }),
    columnHelper.display({
      header: "Edit",
      cell: (info) => {
        const [modalVis, setModalVis] = useState<boolean>(false);
        const deleteMutation = useMutation(
          async () => await deleteOrderById(info.row.original.id),
          {
            onSuccess: async () => toast.success("Deleted order"),
            onError: async () => toast.error("Error deleting order"),
            onSettled: async () => {
              setModalVis(false);
              ordersQuery.refetch();
            },
          }
        );
        return (
          <>
            <Button
              iconName="trash"
              color="red"
              style="secondary"
              onClick={() => setModalVis(true)}
            />
            <DeleteOrderModal
              order={info.row.original}
              modalVisibility={modalVis}
              setModalVisibility={setModalVis}
              deleteMutation={deleteMutation}
            />
          </>
        );
      },
      size: 12,
      footer: (info) => info.column.id,
    }),
  ];

  const table = useReactTable({
    data: orders,
    columns,
    state: {
      grouping: useMemo(() => ["vendor"], []),
      columnVisibility: { vendor: false },
    },

    getCoreRowModel: getCoreRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
  });

  return (
    <div>
      <div className="flex flex-col">
        <div className="inline-block w-full py-2 align-middle">
          <div className="overflow-hidden shadow ring-1 ring-opacity-5 rounded ring-black  md:rounded-lg">
            <table className="min-w-full">
              <thead className="bg-white">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        scope="col"
                        className={
                          header.index === 0
                            ? "py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                            : "px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        }
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              {table.getGroupedRowModel().rows.map((group) => {
                return (
                  <tbody className="bg-white" key={group.id}>
                    <tr className="border-gray-200 border-t">
                      <th
                        colSpan={table.getVisibleFlatColumns().length}
                        className="bg-gray-50 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6"
                      >
                        {group.original.vendor}
                      </th>
                    </tr>
                    {group.getLeafRows().map((row) => {
                      return (
                        <tr
                          key={row.id}
                          className={`
                            ${
                              group.getLeafRows()[0].id === row.id
                                ? "border-gray-300 border-t"
                                : "border-gray-200 border-t"
                            } hover:bg-gray-100
                          `}
                        >
                          {row.getVisibleCells().map((cell) => {
                            return (
                              <td
                                key={cell.id}
                                className={
                                  cell.column.id === "orderNumber"
                                    ? "whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-700 sm:pl-6"
                                    : "whitespace-nowrap px-3 py-2 text-sm text-gray-500"
                                }
                              >
                                {flexRender(cell.column.columnDef.cell, {
                                  ...cell.getContext(),
                                })}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;
