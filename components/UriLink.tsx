import type { LinkProps } from "../types/props";

export default function UriLink({ getValue }: LinkProps) {
  return (
    <div>
      <a href={`${getValue()}`} target="_blank" rel="noopener noreferrer">
        Open Link
      </a>
    </div>
  );
}
