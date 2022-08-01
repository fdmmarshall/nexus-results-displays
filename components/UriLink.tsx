import type { LinkProps } from "../types/props";

export default function UriLink({ info }: LinkProps) {
  return (
    <div>
      <a href={`${info.getValue()}`} target="_blank" rel="noopener noreferrer">
        Open Link
      </a>
    </div>
  );
}
