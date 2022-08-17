import { ReactElement } from "react";

interface PartsLayoutProps {
  tableName: string;
  buttonContent: ReactElement;
  children: ReactElement;
}

const HeaderButtonTableLayout = ({
  tableName,
  buttonContent,
  children,
}: PartsLayoutProps) => {
  return (
    <div className="container mx-auto p-4">
      <div className="flow-root py-4">
        <div className="float-left">
          <h1 className="text-2xl font-bold ">{tableName}</h1>
        </div>
        <div className="float-right">{buttonContent}</div>
      </div>
      {children}
    </div>
  );
};

export default HeaderButtonTableLayout;
