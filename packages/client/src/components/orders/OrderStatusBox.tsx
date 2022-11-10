import { string } from "yup";
import { Order } from "~/types/orderTypes";

const OrderStatusBox = ({
  status,
  disabled,
  size,
}: {
  status: Order["status"];
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}) => {
  const getStuff = () => {
    const getStatus = () => {
      switch (status) {
        case "open":
          return { text: "Open", color: "bg-blue-500 hover:bg-blue-600" };
        case "ordered":
          return { text: "Ordered", color: "bg-yellow-500 hover:bg-yellow-600" };
        case "received":
          return { text: "Received", color: "bg-green-500 hover:bg-green-600" };
      }
    };

    const getSize = () => {
      switch (size) {
        case "sm":
          return "px-2 py-1 text-sm";
        case "lg":
          return "px-3 py-1.5 text-lg";
        default:
          return "px-2 py-1";
      }
    };
    return { returnedStatus: getStatus(), returnedSize: getSize() };
  };
  const { returnedStatus, returnedSize } = getStuff();
  return (
    <div className="whitespace-nowrap w-min transition duration-100">
      <div
        className={`${returnedSize} text-white  ${
          disabled ? "bg-gray-300" : returnedStatus.color
        } rounded-md cursor-pointer select-none`}
      >
        {returnedStatus.text}
      </div>
    </div>
  );
};

export default OrderStatusBox;
