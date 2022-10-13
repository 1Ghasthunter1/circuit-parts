import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import OrderItemsTable from "~/components/orders/projectOrders/OrdersItemTable";
import TopLeftRightAndMiddle from "~/layouts/TopLeftRightAndMiddle";
import { fetchOrder } from "~/services/ordersService";

const OrderView = () => {
  const { id } = useParams();

  if (!id) return null;

  const orderQuery = useQuery(["order", id], () => fetchOrder(id));

  const order = orderQuery.data
  return (
    <>
      {order ? (
        <TopLeftRightAndMiddle
          topLeftContent={
            <>
              <div className="text-4xl font-bold pb-2">{order.orderNumber}</div>
              <div className="text-gray-400 mb-2">
                {order.creationDate.toLocaleDateString("en-us")}
              </div>
            </>
          }
        >
         <OrderItemsTable orderItems={order.items}/>
        </TopLeftRightAndMiddle>
      ) : (
        <div>asd</div>
      )}
    </>
  );
};

export default OrderView;
