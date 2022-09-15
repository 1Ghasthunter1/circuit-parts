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
import UserIcon from "./UserIcon";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    activeUser: User;
  }
}

type TableUser = Omit<User, "token">;

const columnHelper = createColumnHelper<TableUser>();

const columns = [
  columnHelper.display({
    header: "Name",
    cell: (props) => {
      const user = props.row.original;
      return (
        <div className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
          <div className="flex items-center">
            <UserIcon
              text={
                user.firstName.charAt(0).toUpperCase() +
                user.lastName.charAt(0).toUpperCase()
              }
              size="md"
            />
            <div className="ml-4">
              <div className="font-medium text-gray-900">
                {user.firstName + " " + user.lastName}
              </div>
              <div className="text-gray-500">{user.email}</div>
            </div>
          </div>
        </div>
      );
    },
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("username", {
    cell: (props) => (
      <div className="whitespace-nowrap py-2 text-sm text-gray-500">
        {props.getValue()}
      </div>
    ),
    footer: (info) => info.column.id,
    header: "Username",
  }),
  columnHelper.accessor("role", {
    cell: (info) => (
      <div>
        <RoleBox role={info.getValue()} />
      </div>
    ),
    footer: (info) => info.column.id,
    header: "Role",
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

  /* This example requires Tailwind CSS v2.0+ */
  const people = [
    {
      name: "Lindsay Walton",
      title: "Front-end Developer",
      department: "Optimization",
      email: "lindsay.walton@example.com",
      role: "Member",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    // More people...
  ];

  return (
    <>
      {/* New Table */}
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr>
                      {headerGroup.headers.map((header) => (
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
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
                  {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <td
                            key={cell.id}
                            className="h-12 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        );
                      })}
                      {/* 
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.role}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit<span className="sr-only">, {person.name}</span>
                        </a>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersTable;
