import SelectProject from "~/components/dashboard/SelectProject";
import { projectState } from "~/state/state";
import { useSnapshot } from "valtio";
import TopLeftRightAndMiddle from "~/layouts/TopLeftRightAndMiddle";
import DashboardSkeleton from "~/components/skeletons/DashboardSkeleton";
import { fetchOrders } from "~/services/ordersService";
import { useQuery } from "react-query";
import OrdersTable from "~/components/orders/OrdersTable";
import Button from "~/elements/Button";
import NewOrderModal from "~/components/orders/NewOrderModal";
import { Project } from "~/types/projectTypes";
import { useState } from "react";

const OrderView = () => {
  const [createModalVis, setCreateModalVis] = useState<boolean>(false);
  const projectSnap = useSnapshot(projectState).project;
  const projectId = projectSnap?.id;

  const projectOrdersQuery = useQuery(
    `/projects/${projectId}/orders`,
    () => fetchOrders(projectId || ""),
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
        project={projectSnap}
        setProject={(project: Project) => (projectState.project = project)}
      />
    </div>
  );

  let vendors = [...new Set(orders?.map((order) => order.vendor))];

  return (
    <>
      <TopLeftRightAndMiddle
        topLeftContent={TopLeftContent}
        topRightContent={TopRightContent}
      >
        {projectSnap ? (
          !orders ? (
            <DashboardSkeleton rowCount={4} />
          ) : (
            <div className="flex flex-col">
              <div className="w-full ">
                <Button
                  color="green"
                  customStyle="float-right"
                  iconName="file-invoice"
                  onClick={() => setCreateModalVis(true)}
                >
                  Create Order
                </Button>
              </div>
              <OrdersTable orders={orders} ordersQuery={projectOrdersQuery} />
            </div>
          )
        ) : (
          <div>Please select a project above...</div>
        )}
      </TopLeftRightAndMiddle>
      {projectSnap && (
        <NewOrderModal
          project={projectSnap}
          modalVisibility={createModalVis}
          setModalVisibility={setCreateModalVis}
          queriesToInvalidate={[projectOrdersQuery]}
          vendors={vendors}
        />
      )}
    </>
  );
};

export default OrderView;
