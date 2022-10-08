import { string } from "yup";
import { Order } from "~/types/orderTypes";

const OrderStatusBox = ({
  status,
  disabled,
}: {
  status: Order["status"];
  disabled?: boolean;
}) => {
  const getStuff = () => {
    switch (status) {
      case "open":
        return { text: "Open", color: "bg-blue-500" };
      case "ordered":
        return { text: "Ordered", color: "bg-yellow-500" };
      case "received":
        return { text: "Received", color: "bg-green-500" };
    }
  };
  const { text, color } = getStuff();
  return (
    <div className="whitespace-nowrap w-min cursor-pointer">
      <div
        className={`px-2 py-1 text-white  ${
          disabled ? "bg-gray-300" : color
        } rounded-md  select-none`}
      >
        {text}
      </div>
    </div>
  );
};

export default OrderStatusBox;
