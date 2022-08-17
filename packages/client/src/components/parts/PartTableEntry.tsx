interface PartTableEntryProps {
  title: string;
  value: string | undefined;
}

const PartTableEntry = ({ title, value }: PartTableEntryProps) => {
  return (
    <tr className="">
      <td className="border font-bold p-1">{title}</td>
      <td className="border p-1">{value}</td>
    </tr>
  );
};

export default PartTableEntry;
