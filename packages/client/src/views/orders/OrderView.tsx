import SelectProject from "~/components/dashboard/SelectProject";
import { projectSelectState } from "~/state/state";
import { useSnapshot } from "valtio";
import TopLeftRightAndMiddle from "~/layouts/TopLeftRightAndMiddle";
import DashboardSkeleton from "~/components/skeletons/DashboardSkeleton";
import { fetchOrders } from "~/services/ordersService";
import { useQuery } from "react-query";
import OrdersTable from "~/components/orders/projectOrders/OrdersTable";
const OrderView = () => {
  const projectSelectSnapshot = useSnapshot(projectSelectState);
  const projectId = projectSelectSnapshot.project;

  const projectOrdersQuery = useQuery(
    `/projects/${projectId}/orders`,
    () => fetchOrders(projectId),
    { enabled: projectId !== "" }
  );

  const orders = projectOrdersQuery.data;

  const TopLeftContent = <div className="text-4xl font-bold">Orders</div>;
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
            <OrdersTable orders={orders} />
          )
        ) : (
          <div>Please select a project above...</div>
        )}
      </TopLeftRightAndMiddle>
    </>
  );
};

export default OrderView;
