import { Part } from "../../types/partsTypes";
import { Assembly } from "../../types/assemblyTypes";
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
  RowData,
} from "@tanstack/react-table";
import TypeBox from "./TypeBox";
import { Link, useNavigate } from "react-router-dom";
import PartStatusBox from "../parts/PartStatusBox";
import AssemblyStatusBox from "../assemblies/AssemblyStatusBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PartActions from "../parts/PartActions";
import AssemblyActions from "../assemblies/AssemblyActions";

interface PartsTableProps {
  data: (Part | Assembly)[];
  queryKeyToRefresh: string;
}

const columnHelper = createColumnHelper<Part | Assembly>();

const columns = [
  columnHelper.accessor("partNumber", {
    header: "Part Number",
    cell: (info) => {
      return <div className="font-bold">{info.getValue()}</div>;
    },
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("type", {
    header: "Type",
    cell: (info) => {
      return <TypeBox type={info.getValue()} />;
    },
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("name", {
    header: "Name",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("parent", {
    header: "Parent",
    cell: (info) => {
      const parentTypeMap = {
        project: "projects",
        assembly: "assemblies",
      };

      const toUrl = `/${parentTypeMap[info.getValue().type]}/${
        info.getValue().id
      }`;
      return (
        <Link to={toUrl}>
          <div className="underline">{info.getValue().name}</div>
        </Link>
      );
    },
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => {
      const newContext = info as typeof info & { queryToRefresh: string };
      const component = newContext.row.original;
      switch (component.type) {
        case "part":
          return (
            <PartStatusBox
              part={component}
              queryKey={newContext.queryToRefresh}
            />
          );
        case "assembly":
          return (
            <AssemblyStatusBox
              assembly={component}
              queryKey={newContext.queryToRefresh}
            />
          );
      }
    },
    footer: (info) => info.column.id,
  }),
  columnHelper.display({
    header: "Actions",
    cell: (info) => {
      const newContext = info as typeof info & { queryToRefresh: string };

      const component = newContext.row.original;
      switch (component.type) {
        case "part":
          return (
            <PartActions
              part={component}
              queryToRefresh={newContext.queryToRefresh}
            />
          );
        case "assembly":
          return (
            <AssemblyActions
              assembly={component}
              queryToRefresh={newContext.queryToRefresh}
            />
          );
      }
    },
    footer: (info) => info.column.id,
  }),
];

const ComponentsTable = ({ data, queryKeyToRefresh }: PartsTableProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const navigate = useNavigate();

  return (
    <div>
      <div className="flex flex-col">
        <div className="-my-2 ">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
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
                    const component = row.original;
                    const typeToUrlMap = {
                      part: "parts",
                      assembly: "assemblies",
                    };
                    const urlTo = `/${typeToUrlMap[component.type]}/${
                      component.id
                    }`;
                    return (
                      <tr
                        key={row.id}
                        className="hover:bg-gray-50"
                        onClick={() => navigate(urlTo)}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td
                            key={cell.id}
                            className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6"
                          >
                            {flexRender(cell.column.columnDef.cell, {
                              ...cell.getContext(),
                              queryToRefresh: queryKeyToRefresh,
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

export default ComponentsTable;
