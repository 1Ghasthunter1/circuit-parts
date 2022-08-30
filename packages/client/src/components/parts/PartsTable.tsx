import { Part } from "../../types/partsTypes";
import { Assembly } from "../../types/assemblyTypes";
import PartsTableItem from "./PartsTableItem";

interface PartsTableProps {
  data: (Part | Assembly)[];
  queryKeyToRefresh: string;
}

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
