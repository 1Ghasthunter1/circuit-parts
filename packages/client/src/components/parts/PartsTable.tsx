import { Part } from "../../types/partsTypes";
import { Assembly } from "../../types/assemblyTypes";
import PartsTableItem from "./PartsTableItem";
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
  RowData,
} from "@tanstack/react-table";

interface PartsTableProps {
  data: (Part | Assembly)[];
  queryKeyToRefresh: string;
}

const columnHelper = createColumnHelper<Part | Assembly>();

const columns = [
  columnHelper.accessor("partNumber", {
    header: "Part Number",
    cell: (info) => {
      return <div>{info.getValue()}</div>;
    },
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("type", {
    header: "Part Number",
    cell: (info) => {
      return <div>{info.getValue()}</div>;
    },
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("name", {
    header: "Part Number",
    cell: (info) => {
      return <div>{info.getValue()}</div>;
    },
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("parent", {
    header: "Part Number",
    cell: (info) => {
      return <div>{info.getValue().name}</div>;
    },
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => {
      return <div>{info.getValue()}</div>;
    },
    footer: (info) => info.column.id,
  }),
];

const PartsTable = ({ data, queryKeyToRefresh }: PartsTableProps) => {
  return (
    <div className="overflow-x-auto relative sm:rounded-md">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              Part Number
            </th>
            <th scope="col" className="py-3 px-6">
              Type
            </th>
            <th scope="col" className="py-3 px-6">
              Name
            </th>
            <th scope="col" className="py-3 px-6">
              Parent
            </th>
            <th scope="col" className="py-3 px-6">
              Status
            </th>
            <th scope="col" className="py-3 px-6">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((rowItem) => {
              return (
                <PartsTableItem
                  key={rowItem.id}
                  rowItem={rowItem}
                  componentsQueryKey={queryKeyToRefresh}
                />
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default PartsTable;
