import { ReactElement } from "react";

interface PartsLayoutProps {
  tableName: string;
  buttonContent: ReactElement;
  children: ReactElement;
}

const PartsLayout = ({
  tableName,
  buttonContent,
  children,
}: PartsLayoutProps) => {
  return (
    <div className="container mx-auto">
      <div className="flow-root p-4">
        <div className="float-left">
          <h1 className="text-xl font-bold ">{tableName}</h1>
        </div>
        <div className="float-right">{buttonContent}</div>
      </div>
      {children}
    </div>
  );
};

export default PartsLayout;
