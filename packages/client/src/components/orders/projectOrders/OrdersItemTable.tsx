import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
  getGroupedRowModel,
} from "@tanstack/react-table";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Order, OrderItem } from "~/types/orderTypes";
import OrderStatusBox from "./OrderStatusBox";
import { useMemo } from "react";
import { string } from "yup";

const columnHelper = createColumnHelper<OrderItem>();

const columns = [
  columnHelper.accessor("partNumber", {
    cell: (info) => <div>asd</div>,

    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("quantity", {
    header: "Quantity",
    cell: (info) => info.cell.getValue(),
    footer: (info) => info.column.id,
  }),

  columnHelper.accessor("description", {
    header: "Description",
    cell: (info) => info.cell.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("unitCost", {
    header: "Unit Cost",
    cell: (info) => info.cell.getValue(),
    footer: (info) => info.column.id,
  }),

  columnHelper.accessor("notes", {
    header: "Notes",
    cell: (info) => info.cell.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.display({
    header: "Edit",
    cell: (info) => (
      <div>
        <div className="text-indigo-500 underline cursor-pointer min-w-min	">
          Edit
        </div>
      </div>
    ),
    footer: (info) => info.column.id,
  }),
];

const OrderItemsTable = ({ orderItems }: { orderItems: OrderItem[] }) => {
  console.log(orderItems);
  const table = useReactTable({
    data: orderItems,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const navigate = useNavigate();

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
              <tbody>
                {table.getRowModel().rows.map((row) => {
                  console.log(row.getAllCells());
                  return (
                    <tr
                      key={row.id}
                      className="border-gray-200 border-t hover:bg-gray-100"
                    >
                      {row.getAllCells().map((cell) => (
                        <td
                          key={cell.id}
                          className={
                            cell.column.id === "partNumber"
                              ? "whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-700 sm:pl-6"
                              : "whitespace-nowrap px-3 py-2 text-sm text-gray-500"
                          }
                        ></td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItemsTable;
