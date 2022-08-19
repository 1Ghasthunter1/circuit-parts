import { ReactElement } from "react";

interface PartsLayoutProps {
  pageTitle: string;
  subtitle?: string;
  description?: string;
  tableName?: string;
  buttonContent: ReactElement;
  children: ReactElement;
}

const HeaderButtonTableLayout = ({
  pageTitle,
  subtitle,
  description,
  tableName,
  buttonContent,
  children,
}: PartsLayoutProps) => {
  return (
    <div className="container mx-auto p-4">
      <div className="flow-root py-4">
        <div className="float-left">
          <h1 className="text-4xl font-bold ">{pageTitle}</h1>
          <div className="text-md text-gray-400">
            {subtitle ? <b>Prefix: </b> : null}
            {subtitle}
          </div>
          <div className="text-md text-gray-400 font-italic">{description}</div>
        </div>
        <div className="float-right">{buttonContent}</div>
      </div>
      <div className="text-md font-bold text-gray pb-2">{tableName}</div>
      {children}
    </div>
  );
};

export default HeaderButtonTableLayout;
