import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Button from "~/elements/Button";

const TitleTextOptions = ({
  setIsEditing,
  onSave,
  onCancel,
}: {
  setIsEditing: (inp: boolean) => void;
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
        onClick={() => {
          setIsEditing(false);
        }}
      />
      <Button
        iconName="x"
        size="sm"
        style="secondary"
        color="red"
        onClick={() => {
          setIsEditing(false);
        }}
      />
    </div>
  );
};
export default TitleTextOptions;
