import { useNavigate } from "react-router-dom";
import Button from "~/elements/Button";

const BackButton = () => {
  const nagivate = useNavigate();
  return (
    <Button
      iconName="arrow-left"
      customStyle="bg-none shadow-none hover:bg-gray-300 text-gray-600 focus:ring-0 focus:ring-offset-0"
      size="sm"
      onClick={() => nagivate(-1)}
    >
      Back
    </Button>
  );
};
export default BackButton;
