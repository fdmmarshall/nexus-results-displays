import type { NextPage } from "next";
import fetchQuery from "../lib/query";
import refQuery from "../lib/refQuery";
import { useEffect, useState, useReducer, useMemo } from "react";
import { ArrowsExpandIcon } from "@heroicons/react/solid";
import {
  Column,
  Table,
  ExpandedState,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";

type PeriodObject = {
  _id: number;
  periodName: string;
  years: string;
  location: string[];
};

type Ref = {
  _id: number;
};

type Dinosaur = {
  _id: number;
  dinosaurName: string;
  englishTranslation: string;
  period: Ref;
  dinoType: Ref;
  taxonomy: Ref;
  link: string;
};

const Home: NextPage = () => {
  const [data, setData] = useState<Dinosaur[]>([]);
  const rerender = useReducer(() => ({}), {})[1];

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
        cell: (info) => (
          <>
            {info.getValue()}
            <button
              type="button"
              className="inline-flex items-center px-3 py-2 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2"
              onClick={() => {
                refQuery(info.getValue() as number);
              }}
            >
              <ArrowsExpandIcon className="inline-block w-5 h-5" />
            </button>
          </>
        ),
      },
      {
        header: () => "Dinosaur Type",
        accessorKey: "dinoType._id",
        id: "dinoType",
        cell: (info) => info.getValue(),
      },
      {
        header: () => "Taxonomy",
        accessorKey: "taxonomy._id",
        id: "taxonomy",
        cell: (info) => info.getValue(),
      },
      {
        //TODO add <a></a> and href so link is clickable
        header: () => "Link",
        accessorKey: "link",
        id: "link",
        cell: (info) => info.getValue(),
      },
    ],
    []
  );

  useEffect(() => {
    const queryResults = async () => {
      const results = await fetchQuery();
      console.log({ results });

      if (Array.isArray(results) && results.length > 0) {
        setData(results);
      }
    };

    queryResults();
  }, []);
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    debugTable: true,
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8">
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
          <tbody className="divide-y divide-gray-200 bg-white">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-center font-medium text-gray-900 sm:pl-6 truncate"
                  >
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
};

export default Home;
