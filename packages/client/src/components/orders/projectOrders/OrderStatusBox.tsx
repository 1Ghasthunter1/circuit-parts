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
          return { text: "Open", color: "bg-blue-500" };
        case "ordered":
          return { text: "Ordered", color: "bg-yellow-500" };
        case "received":
          return { text: "Received", color: "bg-green-500" };
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
    <div className="whitespace-nowrap w-min">
      <div
        className={`${returnedSize} text-white  ${
          disabled ? "bg-gray-300" : returnedStatus.color
        } rounded-md  select-none`}
      >
        {returnedStatus.text}
      </div>
    </div>
  );
};

export default OrderStatusBox;
