import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";

export const infoToast = (text: string) => {
  toast.success(text, {
    icon: (
      <FontAwesomeIcon icon="circle-info" className="text-blue-500" size="lg" />
    ),
  });
};
