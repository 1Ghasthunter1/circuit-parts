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

interface IOrdersTable {
  orders: Order[];
}

const columnHelper = createColumnHelper<Order>();

const columns = [
  columnHelper.display({
    header: "Name",
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
      grouping: ["vendor"],
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
            <div className="overflow-hidden shadow ring-1 rounded ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          scope="col"
                          className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
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
                    <tbody className="divide-y divide-gray-200 bg-white">
                      <tr>
                        <th
                          colSpan={table.getVisibleFlatColumns().length}
                          className="text-left"
                        >
                          <div className="w-full text-left pl-3 font-medium">
                            {group.original.vendor}
                          </div>
                        </th>
                      </tr>
                      {group.getLeafRows().map((row) => {
                        return (
                          <tr key={row.id} className="hover:bg-gray-50">
                            {row.getVisibleCells().map((cell) => {
                              console.log(cell.column.id);
                              return (
                                <td
                                  key={cell.id}
                                  className={
                                    cell.column.id === "vendor"
                                      ? "whitespace-nowrap px-3 py-1 text-sm font-medium text-gray-900"
                                      : "whitespace-nowrap px-3 py-1 text-sm text-gray-900"
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
    </div>
  );
};

export default OrdersTable;
