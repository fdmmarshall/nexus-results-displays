import { useState, useEffect } from "react";
import { VBTableProps, Results } from "../types/props";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

export default function VBTable({ data, variableBindings }: VBTableProps) {
  const [columns, setDefColumns] = useState<ColumnDef<Results, any>[]>([]);

  const createVBColumns = (variableBindings: string[]) => {
    const columnArray: ColumnDef<Results, any>[] = [];
    if (variableBindings.length > 0) {
      variableBindings.map((variable: string, index: number) => {
        columnArray.push({
          header: () => <span>{`${variable}`}</span>,
          accessorKey: `${index}`,
          id: `${index}`,
          cell: (info: any) => info.getValue(),
        });
      });
    }
    return columnArray;
  };

  useEffect(() => {
    setDefColumns(createVBColumns(variableBindings));
  }, [variableBindings]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
