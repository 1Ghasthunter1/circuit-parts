import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSnapshot } from "valtio";
import { orderSavingState } from "~/state/state";

const OrderSaveStatus = () => {
  const saveSnap = useSnapshot(orderSavingState);
  const getContent = () => {
    switch (saveSnap.status) {
      case "saving":
        return {
          text: "Saving",
          IconComponent: () => (
            <FontAwesomeIcon
              icon="circle-notch"
              size="sm"
              className="animate-spin"
            />
          ),
        };
      case "saved":
        return {
          text: `Saved ${saveSnap.lastActionTime.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
          })}`,
          IconComponent: () => (
            <FontAwesomeIcon icon="check" size="sm" className="" />
          ),
        };
      case "error":
        return {
          text: "Couldn't save order",
          IconComponent: () => (
            <FontAwesomeIcon icon="x" size="sm" className="" />
          ),
        };
      case null:
        return null;
    }
  };
  const content = getContent();
  if (!content) return null;
  const { text, IconComponent } = content;
  return (
    <div className="text-gray-400 flex items-center text-sm">
      <span className="mr-1">{text}</span>
      <IconComponent />
    </div>
  );
};

export default OrderSaveStatus;
