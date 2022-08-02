import { Predicate, Dinosaur } from "../types/props";
import type { ColumnDef } from "@tanstack/react-table";
import UriLink from "../components/UriLink";
import Ref from "../components/Ref";

export default function createColumns(
  predicates: Predicate[],
  refButtonClick: (value: number) => Promise<void>
) {
  let columns: ColumnDef<Dinosaur>[] = [
    {
      header: () => "_id",
      accessorKey: "_id",
      id: "_id",
      cell: (info: any) => info.renderValue(),
    },
  ];

  const filteredPredicates = predicates.map((predicate) => [
    predicate.name.substring(predicate.name.indexOf("/") + 1),
    predicate.type,
  ]);

  filteredPredicates.map((arr) => {
    const predicateName: "period" | "dinoType" | "taxonomy" = arr[0] as
      | "period"
      | "dinoType"
      | "taxonomy";
    const predicateType: string = arr[1];

    const columnObject = {
      header: () => predicateName,
      accessorKey: predicateName,
      id: predicateName,
      cell: (info: any) => info.getValue(),
    };

    if (predicateType === "ref") {
      columns.push({
        header: () => predicateName,
        accessorKey: `${predicateName}._id`,
        id: predicateName,
        cell: (info: any) => (
          <Ref info={info} refButtonClick={refButtonClick} />
        ),
      });
    } else if (predicateType === "uri") {
      columns.push({
        header: () => predicateName,
        accessorKey: `${predicateName}._id`,
        id: predicateName,
        cell: (info: any) => <UriLink info={info} />,
      });
    } else {
      columns.push(columnObject);
    }
  });

  return columns;
}
