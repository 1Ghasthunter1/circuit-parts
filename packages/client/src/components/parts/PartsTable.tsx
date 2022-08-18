import { Part } from "../../types/partsTypes";
import { Assembly } from "../../types/assemblyTypes";
import { useNavigate } from "react-router-dom";
import StatusBox from "../../components/entries/StatusBox";
interface PartsTableProps {
  data: Array<Assembly | Part> | undefined;
}

const PartsTable = ({ data }: PartsTableProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate();

  if (data === undefined || data === null) {
    return null;
  }

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
              Edit
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((rowItem) => {
              return (
                <tr
                  key={rowItem.id}
                  className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700"
                  onClick={
                    rowItem.type === "part"
                      ? () => navigate(`/parts/${rowItem.id}`)
                      : () => navigate(`/assemblies/${rowItem.id}`)
                  }
                >
                  <th
                    scope="row"
                    className="h-12 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {rowItem.partNumber}
                  </th>
                  <td className="px-6">{rowItem.type}</td>
                  <td className="px-6">{rowItem.name}</td>
                  <td className="px-6">{rowItem.parent.parent.name}</td>
                  <td className="flex items-center grid place-items-center px-6">
                    <StatusBox inpStatus={rowItem.status} />
                  </td>
                  <td className="px-6">edit stuff</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default PartsTable;
