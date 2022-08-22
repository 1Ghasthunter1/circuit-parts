const TestThing = () => {
  return (
      <div className="relative my-6 ">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white w-600 outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <h3 className="text-2xl font-semibold">Modal Title</h3>
            <button
              className="p-1 bg-transparent border-0 float-rightleading-none font-semibold outline-none focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
              }}
            ></button>
          </div>
          <div className="relative p-6 flex-auto">ASD</div>
        </div>
      </div>
  );
};

export default TestThing;
