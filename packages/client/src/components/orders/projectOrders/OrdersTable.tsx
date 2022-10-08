import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
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
    getCoreRowModel: getCoreRowModel(),
  });

  const navigate = useNavigate();

  return (
    <div>
      <div className="flex flex-col">
        <div className="-my-2 ">
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
                <tbody className="divide-y divide-gray-200 bg-white">
                  {table.getRowModel().rows.map((row) => {
                    return (
                      <tr key={row.id} className="hover:bg-gray-50">
                        {row.getVisibleCells().map((cell) => (
                          <td
                            key={cell.id}
                            className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6"
                          >
                            {flexRender(cell.column.columnDef.cell, {
                              ...cell.getContext(),
                            })}
                          </td>
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
    </div>
  );
};

export default OrdersTable;
