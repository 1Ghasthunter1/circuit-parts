import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
  RowData,
} from "@tanstack/react-table";
import { User } from "../../types/userTypes";
import UserActions from "./UserActions";
import { userState } from "../../state/state";
import { useSnapshot } from "valtio";
import RoleBox from "./RoleBox";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    activeUser: User;
  }
}

type TableUser = Omit<User, "token">;

const columnHelper = createColumnHelper<TableUser>();

const columns = [
  columnHelper.accessor("firstName", {
    cell: (info) => info.getValue<string>(),
    footer: (info) => info.column.id,
    header: "First Name",
  }),
  columnHelper.accessor("lastName", {
    cell: (info) => info.getValue<string>(),
    footer: (info) => info.column.id,
    header: "Last Name",
  }),
  columnHelper.accessor("email", {
    cell: (info) => info.getValue<string>(),
    footer: (info) => info.column.id,
    header: "Email",
  }),
  columnHelper.accessor("username", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("role", {
    cell: (info) => (
      <div>
        <RoleBox role={info.getValue()} />
      </div>
    ),
    footer: (info) => info.column.id,
  }),
  columnHelper.display({
    header: "Edit",
    cell: (props) => (
      <UserActions
        user={props.row.original}
        activeUser={props.table.options.meta?.activeUser}
      />
    ),
    footer: (info) => info.column.id,
  }),
];

const UsersTable = ({ data }: { data: TableUser[] }) => {
  const activeUser = useSnapshot(userState).user;
  if (!activeUser) return null;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: { activeUser },
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
              className={`hover:bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700 ${
                row.original.id === activeUser.id
                  ? "odd:bg-blue-100 even:bg-blue-100 hover:bg-blue-200"
                  : "odd:bg-white even:bg-gray-50"
              }`}
            >
              {row.getVisibleCells().map((cell) => {
                return (
                  <td
                    key={cell.id}
                    className="h-12 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
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
