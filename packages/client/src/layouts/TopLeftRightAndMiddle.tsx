interface PartsLayoutProps {
  topLeftContent?: JSX.Element;
  topRightContent?: JSX.Element;
  children?: JSX.Element;
}

const TopLeftRightAndMiddle = ({
  topLeftContent,
  topRightContent,
  children,
}: PartsLayoutProps) => {
  return (
    <div className="container mx-auto p-4">
      <div className="flow-root py-4">
        <div className="float-left">{topLeftContent || <></>}</div>
        <div className="float-right">{topRightContent || <></>}</div>
      </div>
      {children}
    </div>
  );
};

export default TopLeftRightAndMiddle;
