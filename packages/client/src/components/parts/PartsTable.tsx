import { UseQueryResult } from "react-query";
import { TestPart } from "../../types/partsTypes";
import { useNavigate } from "react-router-dom";
interface PartsTableProps {
  partsQuery: UseQueryResult<TestPart[], unknown>;
}

const PartsTable = ({ partsQuery }: PartsTableProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error, isError, isLoading } = partsQuery;
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto relative sm:rounded-lg">
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
              Edit
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((part) => {
              return (
                <tr
                  key={part.id}
                  className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700"
                  onClick={() => navigate(part.id)}
                >
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {part.partNumber}
                  </th>
                  <td className="py-4 px-6">{part.type}</td>
                  <td className="py-4 px-6">{part.name}</td>
                  <td className="py-4 px-6">{part.id}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default PartsTable;
