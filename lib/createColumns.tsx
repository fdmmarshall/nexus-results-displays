import { Predicate, Dinosaur } from "../types/props";
import type { ColumnDef } from "@tanstack/react-table";

export default function createColumns(predicates: Predicate[]) {
  let columns: ColumnDef<Dinosaur>[] = [
    {
      header: () => "_id",
      accessorKey: "_id",
      id: "_id",
      cell: (info: any) => info.renderValue(),
    },
  ];

  const filteredPredicates = predicates.map((predicate) => [
    predicate.name,
    predicate.type,
  ]);

  console.log(filteredPredicates);

  const test = filteredPredicates.map((arr) => {
    const predicateName: "period" | "dinoType" | "taxonomy" = arr[0] as
      | "period"
      | "dinoType"
      | "taxonomy";
    const predicateType: string = arr[1];

    const columnObject = {
      header: () => predicateName,
      accessorKey: predicateName,
      id: predicateName,
      cell: filterTypes(predicateType),
    };

    if (predicateType === "ref") {
      columns.push({
        header: () => predicateName,
        accessorKey: `${predicateName}._id`,
        id: predicateName,
        cell: filterTypes(predicateType),
      });
    } else {
      columns.push(columnObject);
    }
  });

  console.log(columns);

  return columns;
}

function filterTypes(type: string) {
  if (type === "ref") {
    return (info: any) => info.getValue();
  } else if (type === "uri") {
    return (info: any) => (
      <div>
        <a
          href={`${info.getValue()}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Link
        </a>
      </div>
    );
  } else if (type === "string") {
    return (info: any) => info.getValue();
  }
}
