import SelectProject from "~/components/dashboard/SelectProject";
import { projectSelectState } from "~/state/state";
import { useSnapshot } from "valtio";
import TopLeftRightAndMiddle from "~/layouts/TopLeftRightAndMiddle";
import DashboardSkeleton from "~/components/skeletons/DashboardSkeleton";
import { fetchOrders } from "~/services/ordersService";
import { useQuery } from "react-query";
import OrdersTable from "~/components/orders/projectOrders/OrdersTable";
import Button from "~/elements/Button";
const OrderView = () => {
  const projectSelectSnapshot = useSnapshot(projectSelectState);
  const projectId = projectSelectSnapshot.project;

  const projectOrdersQuery = useQuery(
    `/projects/${projectId}/orders`,
    () => fetchOrders(projectId),
    { enabled: projectId !== "" }
  );

  const orders = projectOrdersQuery.data;

  const TopLeftContent = (
    <div className="flex-auto">
      <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
      <p className="mt-2 text-sm text-gray-700">
        All orders for the selected project at the right.
      </p>
    </div>
  );
  const TopRightContent = (
    <div className="w-[300px]">
      <SelectProject
        projectId={projectSelectSnapshot.project}
        setProjectId={(value) => (projectSelectState.project = value)}
      />
    </div>
  );
  return (
    <>
      <TopLeftRightAndMiddle
        topLeftContent={TopLeftContent}
        topRightContent={TopRightContent}
      >
        {projectId !== "" ? (
          !orders ? (
            <DashboardSkeleton rowCount={4} />
          ) : (
            <div className="flex flex-col">
              <div className="w-full ">
                <Button
                  color="green"
                  customStyle="float-right"
                  iconName="file-invoice"
                >
                  Create Order
                </Button>
              </div>
              <OrdersTable orders={orders} />
            </div>
          )
        ) : (
          <div>Please select a project above...</div>
        )}
      </TopLeftRightAndMiddle>
    </>
  );
};

export default OrderView;
