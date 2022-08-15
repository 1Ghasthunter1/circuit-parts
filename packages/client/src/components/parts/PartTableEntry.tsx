interface PartTableEntryProps {
  key: string;
  title: string;
  value: string | undefined;
}

const PartTableEntry = ({ key, title, value }: PartTableEntryProps) => {
  return (
    <tr key={key} className="">
      <td className="border font-bold p-1">{title}</td>
      <td className="border p-1" >{value}</td>
    </tr>
  );
};

export default PartTableEntry;
