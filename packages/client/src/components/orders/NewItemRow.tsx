import { useState } from "react";
import Button from "~/elements/Button";
import EditableInput from "~/elements/EditableInput";

const NewItemRow = () => {
  const [test, setTest] = useState<string>("");
  return (
    <tr className="border-gray-200 border-t odd:bg-gray-50 even:bg-gray-100 hover:bg-gray-200">
      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500 h-full">
        <EditableInput
          value={test}
          onChangeFunc={(e) => {
            console.log("ok its running fr");
            setTest(e.target.value);
          }}
          placeholder="test"
          hideButtons={true}
          componentStyle={"text-md font-bold"}
        />
      </td>
      <td className={"whitespace-nowrap px-3 py-2 text-sm text-gray-500"}>
        <EditableInput
          value={test}
          onChangeFunc={(e) => {
            console.log("ok its running fr2");
            setTest(e.target.value);
          }}
          placeholder="test"
          hideButtons={true}
          componentStyle={"text-md font-bold"}
        />
      </td>
      <td className={"whitespace-nowrap px-3 py-2 text-sm text-gray-500"}>
        <EditableInput
          value={test}
          onChangeFunc={(e) => {
            console.log("ok its running fr2");
            setTest(e.target.value);
          }}
          placeholder="test"
          hideButtons={true}
          componentStyle={"text-md font-bold"}
        />
      </td>
      <td className={"whitespace-nowrap px-3 py-2 text-sm text-gray-500"}>
        <EditableInput
          value={test}
          onChangeFunc={(e) => {
            console.log("ok its running fr2");
            setTest(e.target.value);
          }}
          placeholder="test"
          hideButtons={true}
          componentStyle={"text-md font-bold"}
        />
      </td>
      <td className={"whitespace-nowrap px-3 py-2 text-sm text-gray-500"}>
        <EditableInput
          value={test}
          onChangeFunc={(e) => {
            console.log("ok its running fr2");
            setTest(e.target.value);
          }}
          placeholder="test"
          hideButtons={true}
          componentStyle={"text-md font-bold"}
        />
      </td>
      <td className={"whitespace-nowrap px-3 py-2 text-sm text-gray-500"}>
        <EditableInput
          value={test}
          onChangeFunc={(e) => {
            console.log("ok its running fr2");
            setTest(e.target.value);
          }}
          placeholder="test"
          hideButtons={true}
          componentStyle={"text-md font-bold"}
        />
      </td>
      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500 space-x-1">
        <Button
          iconName="check"
          style="secondary"
          color="blue"
          size="sm"
        ></Button>
        <Button iconName="x" style="secondary" color="red" size="sm"></Button>
      </td>
    </tr>
  );
};

export default NewItemRow;
