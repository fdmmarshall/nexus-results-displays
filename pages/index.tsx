import type { NextPage } from "next";
import fetchQuery from "../lib/query";
import refQuery from "../lib/refQuery";
import { useEffect, useState, useMemo } from "react";
import { ExternalLinkIcon } from "@heroicons/react/solid";
import {
  useReactTable,
  getCoreRowModel,
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
  const [refData, setRefData] = useState<PeriodObject[]>([]);
  // const rerender = useReducer(() => ({}), {})[1];

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
          <div className="flex flex-row justify-between items-center">
            <>
              {`ref: ${getValue()}`}
              <button
                type="button"
                className="flex items-center text-center"
                onClick={async () => {
                  const refResults = await refQuery(getValue() as number);
                  setRefData(refResults);
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
          <div className="flex flex-row justify-between items-center">
            <>
              {`ref: ${getValue()}`}
              <button
                type="button"
                className="flex items-center text-center"
                onClick={async () => {
                  const refResults = await refQuery(getValue() as number);
                  setRefData(refResults);
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
          <div className="flex flex-row justify-between items-center">
            <>
              {`ref: ${getValue()}`}
              <button
                type="button"
                className="flex items-center text-center"
                onClick={async () => {
                  const refResults = await refQuery(getValue() as number);
                  setRefData(refResults);
                }}
              >
                <ExternalLinkIcon className="inline-block w-4 h-4" />
              </button>
            </>
          </div>
        ),
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

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
