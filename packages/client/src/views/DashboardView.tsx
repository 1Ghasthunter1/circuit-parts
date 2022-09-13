import DashboardSkeleton from "~/components/skeletons/DashboardSkeleton";
import TopLeftRightAndMiddle from "~/layouts/TopLeftRightAndMiddle";

const DashboardView = () => {
  const TopLeftContent = <div className="text-4xl font-bold">Dashboard</div>;
  const TopRightContent = <div></div>;
  return (
    <>
      <TopLeftRightAndMiddle
        topLeftContent={TopLeftContent}
        topRightContent={TopRightContent}
      >
        {false ? (
          <DashboardSkeleton rowCount={4} />
        ) : (
          <div>This is dashboard</div>
        )}
      </TopLeftRightAndMiddle>
    </>
  );
};

export default DashboardView;
