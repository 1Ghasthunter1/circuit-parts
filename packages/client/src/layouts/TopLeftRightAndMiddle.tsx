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
      <div className="flex mb-2">
        <div className="">{topLeftContent || <></>}</div>
        <div className="ml-auto">{topRightContent || <></>}</div>
      </div>
      {children}
    </>
  );
};

export default TopLeftRightAndMiddle;
