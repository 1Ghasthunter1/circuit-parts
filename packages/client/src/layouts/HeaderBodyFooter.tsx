import React, { ReactElement } from "react";

interface HeaderBodyFooterType {
  header?: ReactElement;
  children: ReactElement;
  footer?: ReactElement;
}

const HeaderBodyFooter = ({
  header,
  children,
  footer,
}: HeaderBodyFooterType) => {
  return (
    <div>
      {header}
      {children}
      {footer}
    </div>
  );
};

export default HeaderBodyFooter;
