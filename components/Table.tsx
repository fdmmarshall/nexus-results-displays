import { ExternalLinkIcon } from "@heroicons/react/solid";
import { useState, useMemo, useEffect } from "react";
import { Dinosaur, Predicate } from "../types/props";
import createColumns from "../lib/createColumns";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";

type TableProps = {
  data: Dinosaur[];
  refButtonClick: (value: number) => Promise<void>;
  predicates: Predicate[];
};

export default function Table({
  data,
  refButtonClick,
  predicates,
}: TableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  //TODO createColumns function will run in this useEffect
  useEffect(() => {
    createColumns(predicates);
  }, [predicates]);

  const columns = useMemo<ColumnDef<Dinosaur>[]>(
    () => [
      {
        header: () => "_id",
        accessorKey: "_id",
        id: "_id",
        cell: (info) => info.renderValue(),
      },
      {
        header: () => "Dinosaur Name",
        accessorKey: "dinosaurName",
        id: "dinosaurName",
        cell: (info) => info.getValue(),
      },
      {
        header: () => "Translation",
        accessorKey: "englishTranslation",
        id: "englishTranslation",
        cell: (info) => info.getValue(),
      },
      {
        header: () => "Period",
        accessorKey: "period._id",
        id: "period",
        cell: ({ getValue }) => (
          <div className="flex flex-row justify-evenly items-center">
            <>
              {`ref: ${getValue()}`}
              <button
                type="button"
                className="flex items-center text-center"
                onClick={() => {
                  refButtonClick(getValue() as number);
                }}
              >
                <ExternalLinkIcon className="inline-block w-4 h-4" />
              </button>
            </>
          </div>
        ),
      },
      {
        header: () => "Dinosaur Type",
        accessorKey: "dinoType._id",
        id: "dinoType",
        cell: ({ getValue }) => (
          <div className="flex flex-row justify-evenly items-center">
            <>
              {`ref: ${getValue()}`}
              <button
                type="button"
                className="flex items-center text-center"
                onClick={() => {
                  refButtonClick(getValue() as number);
                }}
              >
                <ExternalLinkIcon className="inline-block w-4 h-4" />
              </button>
            </>
          </div>
        ),
      },
      {
        header: () => "Taxonomy",
        accessorKey: "taxonomy._id",
        id: "taxonomy",
        cell: ({ getValue }) => (
          <div className="flex flex-row justify-evenly items-center">
            <>
              {`ref: ${getValue()}`}
              <button
                type="button"
                className="flex items-center text-center"
                onClick={() => {
                  refButtonClick(getValue() as number);
                }}
              >
                <ExternalLinkIcon className="inline-block w-4 h-4" />
              </button>
            </>
          </div>
        ),
      },
      {
        header: () => "Link",
        accessorKey: "link",
        id: "link",
        cell: ({ getValue }) => (
          <div>
            <a href={`${getValue()}`} target="_blank" rel="noopener noreferrer">
              Open Link
            </a>
          </div>
        ),
      },
    ],
    [refButtonClick]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <div className="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-center font-medium text-gray-900 sm:pl-6"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center gap-2 p-4">
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div>{table.getRowModel().rows.length} Rows</div>
      <pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre>
    </div>
  );
}
