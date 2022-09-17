const TopLeftCenterSkeleton = () => {
  return (
    <div className="container mx-auto animate-pulse">
      <div className="flow-root py-4">
        <div className="float-left">
          <div className="h-8 bg-gray-300 rounded-full dark:bg-gray-700 w-120 mb-4" />
          <div className="h-4 w-80 bg-gray-300 rounded-full dark:bg-gray-700 mb-2" />
          <div className="h-4 2-60 bg-gray-300 rounded-full dark:bg-gray-700 mb-2" />
        </div>
        <div className="float-right flex space-x-4">
          <div className="h-10 w-32 bg-gray-300 rounded-lg dark:bg-gray-700 mb-2" />
          <div className="h-10 w-32 bg-gray-300 rounded-lg dark:bg-gray-700 mb-2" />
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-8 w-full bg-gray-300 rounded-lg dark:bg-gray-700" />
        <div className="h-8 w-full bg-gray-300 rounded-lg dark:bg-gray-700" />
        <div className="h-8 w-full bg-gray-300 rounded-lg dark:bg-gray-700" />
        <div className="h-8 w-full bg-gray-300 rounded-lg dark:bg-gray-700" />
        <div className="h-8 w-full bg-gray-300 rounded-lg dark:bg-gray-700" />
        <div className="h-8 w-full bg-gray-300 rounded-lg dark:bg-gray-700" />
        <div className="h-8 w-full bg-gray-300 rounded-lg dark:bg-gray-700" />
        <div className="h-8 w-full bg-gray-300 rounded-lg dark:bg-gray-700" />
        <div className="h-8 w-full bg-gray-300 rounded-lg dark:bg-gray-700" />
        <div className="h-8 w-full bg-gray-300 rounded-lg dark:bg-gray-700" />
        <div className="h-8 w-full bg-gray-300 rounded-lg dark:bg-gray-700" />
      </div>
    </div>
  );
};

export default TopLeftCenterSkeleton;
