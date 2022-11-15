import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { knownCarriers } from "~/constants";

const TrackingNumber = ({
  carrier,
  trackingNumber,
}: {
  carrier?: string;
  trackingNumber?: string;
}) => {
  const foundCarrier = knownCarriers[carrier || ""] as
    | typeof knownCarriers[""]
    | undefined;

  return (
    <span>
      {foundCarrier ? (
        <a
          className="underline"
          href={`${foundCarrier.baseUrl}${trackingNumber}`}
          target="_blank"
        >
          {trackingNumber}
          <span className="ml-1">
            <FontAwesomeIcon icon="arrow-up-right-from-square" />
          </span>
        </a>
      ) : (
        <span>{trackingNumber}</span>
      )}
    </span>
  );
};

export default TrackingNumber;
