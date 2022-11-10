import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OrderStatus } from "~/types/universalTypes";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const OrderStatusProgress = ({ status }: { status: OrderStatus }) => {
  let steps: { name: string; status: string }[] = [];

  switch (status) {
    case "open":
      steps = [
        { name: "Open", status: "current" },
        { name: "Ordered", status: "" },
        { name: "Received", status: "" },
      ];
      break;

    case "ordered":
      steps = [
        { name: "Open", status: "complete" },
        { name: "Ordered", status: "complete" },
        { name: "Received", status: "" },
      ];
      break;
    case "received":
      steps = [
        { name: "Open", status: "complete" },
        { name: "Ordered", status: "complete" },
        { name: "Received", status: "complete" },
      ];
      break;
  }

  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => {
          return (
            <li
              key={step.name}
              className={classNames(
                stepIdx !== steps.length - 1 ? "pr-8 md:pr-32 sm:pr-20" : "",
                "relative"
              )}
            >
              {step.status === "complete" ? (
                <>
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div
                      className={`h-0.5 w-full ${
                        steps.length - 1 > stepIdx
                          ? steps[stepIdx + 1].status === "complete" ||
                            steps[stepIdx + 1].status === "current"
                            ? "bg-pink-500"
                            : " border-t-[3px] border-pink-300 border-dotted"
                          : "asd"
                      }`}
                    />
                  </div>
                  <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-pink-500 hover:bg-pink-700">
                    <FontAwesomeIcon
                      className="h-5 w-5 text-white"
                      icon={"check"}
                    />
                  </span>
                  <span className="relative flex h-0 w-8 items-center justify-center text-sm text-pink-500">
                    <span className="mt-4 font-semibold">{step.name}</span>
                  </span>
                </>
              ) : step.status === "current" ? (
                <>
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="h-0.5 w-full bg-gray-200" />
                  </div>
                  <a
                    href="#"
                    className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-pink-700 bg-white"
                    aria-current="step"
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full bg-pink-500"
                      aria-hidden="true"
                    />
                  </a>
                  <span className="relative flex h-0 w-8 items-center justify-center text-sm text-pink-700">
                    <span className="mt-4 font-semibold">{step.name}</span>
                  </span>
                </>
              ) : (
                <span className="group">
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="h-0.5 w-full bg-gray-200" />
                  </div>
                  <a
                    href="#"
                    className=" relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400"
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300"
                      aria-hidden="true"
                    />
                  </a>
                  <span className="relative flex h-0 w-8 items-center justify-center text-sm text-gray-200 group-hover:bg-gray-300 group-hover:text-gray-400">
                    <span className="mt-4 font-semibold">{step.name}</span>
                  </span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default OrderStatusProgress;
