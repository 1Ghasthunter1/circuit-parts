import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface GenericModalProps {
  title: string;
  subtitle?: string;
  closeModal: () => void;
  children: JSX.Element;
}

const GenericModal = ({
  title,
  closeModal,
  children,
  subtitle,
}: GenericModalProps) => {
  return (
    <div className="border-0 rounded-lg shadow-lg  relative flex flex-col bg-white w-600 outline-none focus:outline-none">
      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
        <div>
          <h3 className="text-2xl font-semibold">{title}</h3>
          <div className="text-gray-500">{subtitle}</div>
        </div>
        <button
          className="p-1 bg-transparent border-0 float-rightleading-none font-semibold outline-none focus:outline-none"
          onClick={(e) => {
            e.stopPropagation();
            closeModal();
          }}
        >
          <FontAwesomeIcon icon="square-xmark" className="text-red-500 hover:text-red-600" size="2x" />
        </button>
      </div>
      <div className="relative p-6 flex-auto bg-transparent">{children}</div>
    </div>
  );
};
export default GenericModal;
