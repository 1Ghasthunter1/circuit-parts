import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
  getGroupedRowModel,
} from "@tanstack/react-table";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Order } from "~/types/orderTypes";
import OrderStatusBox from "./OrderStatusBox";
import { useMemo } from "react";
import { string } from "yup";

interface IOrdersTable {
  orders: Order[];
}

const columnHelper = createColumnHelper<Order>();

const columns = [
  columnHelper.display({
    header: "Name",
    id: "name",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="">
          {order.vendor} {order.creationDate.toLocaleDateString("en-US")}
        </div>
      );
    },
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("creationDate", {
    header: "Creation Date",
    cell: (info) => <div>{info.getValue().toLocaleDateString("en-US")}</div>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("vendor", {
    header: "Vendor",
    cell: (info) => info.cell.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => <OrderStatusBox status={info.getValue()} />,
    footer: (info) => info.column.id,
  }),
];

const OrdersTable = ({ orders }: { orders: Order[] }) => {
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

  const navigate = useNavigate();

  return (
    <div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden shadow ring-1 ring-opacity-5 m-1 rounded ring-black  md:rounded-lg">
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
                    <tbody className="bg-white">
                      <tr className="border-t border-gray-200">
                        <th
                          colSpan={table.getVisibleFlatColumns().length}
                          className="bg-gray-50 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6"
                        >
                          {group.original.vendor}
                        </th>
                      </tr>
                      {group.getLeafRows().map((row) => (
                        <tr
                          key={row.id}
                          className={`
                            ${
                              row.index === 0
                                ? "border-gray-300 border-t"
                                : "border-gray-200 border-t"
                            } hover:bg-gray-100
                          `}
                        >
                          {row.getVisibleCells().map((cell) => {
                            console.log(cell.column.id);
                            return (
                              <td
                                key={cell.id}
                                className={
                                  cell.column.id === "name"
                                    ? "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-700 sm:pl-6"
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
                      ))}
                    </tbody>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;
