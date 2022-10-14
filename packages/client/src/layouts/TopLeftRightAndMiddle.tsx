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
    <>
      <div className="flow-root mb-6">
        <div className="float-left">{topLeftContent || <></>}</div>
        <div className="float-right">{topRightContent || <></>}</div>
      </div>
      {children}
    </>
  );
};

export default TopLeftRightAndMiddle;
