import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { User } from "../../types/userTypes";

type TableUser = Omit<User, "token">;

const columnHelper = createColumnHelper<TableUser>();

const columns = [
  columnHelper.accessor("firstName", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("lastName", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("username", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("role", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
];

const UsersTable = ({ data }: { data: TableUser[] }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="overflow-x-auto relative sm:rounded-md">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="h-12 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
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
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700"
            >
              {row.getVisibleCells().map((cell) => {
                console.log(cell);
                return (
                  <td
                    key={cell.id}
                    className={
                      cell.column.id === "firstName"
                        ? "h-12 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        : "h-12"
                    }
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
