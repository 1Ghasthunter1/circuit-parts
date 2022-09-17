interface PartTableEntryProps {
  title: string;
  content: JSX.Element | string | undefined;
}

const PartTableEntry = ({ title, content }: PartTableEntryProps) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-700 font-bold sm:pl-6">
        {title}
      </td>
      <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-700 sm:pl-6">
        {content}
      </td>
    </tr>
  );
};

export default PartTableEntry;
