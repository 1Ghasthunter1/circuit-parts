import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Transition } from "@headlessui/react";
import toast, { Toaster, ToastIcon, resolveValue } from "react-hot-toast";

const TailwindToaster = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
      }}
    >
      {(t) => (
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          <Transition
            appear
            show={t.visible}
            className="transform p-4 flex bg-white rounded shadow-lg"
            enter="transition-all duration-150"
            enterFrom="opacity-0 scale-50"
            enterTo="opacity-100 scale-100"
            leave="transition-all duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-75"
          >
            <div className="flex content-center space-x-3 ">
              <div>
                <ToastIcon toast={t} />
              </div>
              <div>
                <div className="flex-1 pt-0.5 ">
                  <div className="text-sm font-medium text-gray-900">
                    {resolveValue(t.message, t)}
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="inline-flex mb-auto px-2 h-min rounded-md bg-white text-gray-400 hover:text-gray-500 "
                onClick={() => {
                  toast.dismiss(t.id);
                }}
              >
                <div className="m-0.25">
                  <FontAwesomeIcon icon="x" size="xs" />
                </div>
              </button>
            </div>
          </Transition>
        </div>
      )}
    </Toaster>
  );
};
export default TailwindToaster;
