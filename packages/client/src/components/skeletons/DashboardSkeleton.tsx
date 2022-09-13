const DashboardSkeleton = ({ rowCount }: { rowCount?: number }) => {
  rowCount = rowCount || 4;
  return (
    <div className="space-y-3 ">
      {[...Array(rowCount)].map((e, i) => (
        <div
          key={i}
          role="status"
          className="animate-pulse p-4 space-y-4 rounded-2xl border border-gray-200 divide-y divide-gray-200 dark:divide-gray-700 md:p-6 dark:border-gray-700"
        >
          <div className="flex justify-between items-center rounded-3xl w-full">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardSkeleton;
