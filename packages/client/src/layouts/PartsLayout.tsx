import { ReactElement } from "react";

interface PartsLayoutProps {
  tableName: string;
  children: ReactElement;
}

const PartsLayout = ({
  tableName,
  children,
}: PartsLayoutProps) => {
  return (
    <div className="container mx-auto">
      <h1 className="text-xl font-bold p-4">{tableName}</h1>
      {children}
    </div>
  );
};

export default PartsLayout;
