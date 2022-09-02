interface PartTableEntryProps {
  title: string;
  content: JSX.Element | string | undefined;
}

const PartTableEntry = ({ title, content }: PartTableEntryProps) => {
  return (
    <tr className="">
      <td className="border font-bold p-1">{title}</td>
      <td className="border p-1">{content}</td>
    </tr>
  );
};

export default PartTableEntry;
