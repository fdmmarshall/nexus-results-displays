import { useMemo } from "react";
import { VBTableProps, Results } from "../types/props";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

export default function VBTable({ data, variableBindings }: VBTableProps) {
  const columns = useMemo<ColumnDef<Results>[]>(
    () => [
      {
        header: () => <span>{`${variableBindings[0]}`}</span>,
        accessorKey: "0",
        id: `${variableBindings[0]}`,
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{`${variableBindings[1]}`}</span>,
        accessorKey: "1",
        id: `${variableBindings[1]}`,
        cell: (info) => info.getValue(),
      },
      {
        header: () => <span>{`${variableBindings[2]}`}</span>,
        accessorKey: "2",
        id: `${variableBindings[2]}`,
        cell: (info) => info.getValue(),
      },
    ],
    [variableBindings]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  console.log(columns);
  return (
    <div>
      <div className="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
