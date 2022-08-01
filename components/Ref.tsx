import type { RefProps } from "../types/props";
import { ExternalLinkIcon } from "@heroicons/react/solid";

export default function Ref({ info, refButtonClick }: RefProps) {
  return (
    <div className="flex flex-row justify-evenly items-center">
      <>
        {`ref: ${info.getValue()}`}
        <button
          type="button"
          className="flex items-center text-center"
          onClick={() => {
            refButtonClick(info.getValue() as number);
          }}
        >
          <ExternalLinkIcon className="inline-block w-4 h-4" />
        </button>
      </>
    </div>
  );
}
