import { Assembly } from "~/types/assemblyTypes";
import { Part } from "~/types/partsTypes";
import StatusBox from "../components/StatusBox";
import TitleCard from "../components/TitleCard";

const ProjectsDashboard = ({
  components,
  filter,
}: {
  components: (Assembly | Part)[];
  filter: string;
}) => {
  type ResultType = {
    [key in Assembly["status"] | Part["status"]]?: (Assembly | Part)[];
  };

  const mappedComponents = components.reduce(
    (result: ResultType, component) => ({
      ...result,
      [component.status]: [...(result[component.status] || []), component],
    }),
    {}
  );

  return (
    <div>
      {Object.entries(mappedComponents).map(([status, components]) => {
        return (
          <div key={status}>
            <div className="w-full">
              <StatusBox
                status={status as Assembly["status"] | Part["status"]}
              />
              <div className="bg-gray-50 shadow w-full mb-4 rounded-lg mt-1 p-2">
                <div className="flex flex-wrap relative gap-2 ">
                  {components.map((c) => (
                    <div
                      key={c.id}
                      className="group relative"
                    >
                      <TitleCard component={c} />
                      <span className="ease-in-out duration-200 absolute hidden group-hover:flex -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full px-4 py-2 bg-gray-700 rounded-lg text-center text-white text-sm after:content-[''] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-gray-700">
                        {c.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectsDashboard;
