import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Button from "~/elements/Button";

const TitleTextOptions = ({
  onSave,
  onCancel,
}: {
  onSave?: () => void;
  onCancel?: () => void;
}) => {
  return (
    <div className="flex space-x-2" id="test">
      <Button
        iconName="check"
        size="sm"
        style="secondary"
        color="blue"
        onClick={onSave}
      />
      <Button
        iconName="x"
        size="sm"
        style="secondary"
        color="red"
        onClick={onCancel}
      />
    </div>
  );
};
export default TitleTextOptions;
