import type { NextPage } from "next";
import fetchQuery from "../lib/query";
import { useEffect, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import styles from "../styles/Home.module.css";

type Taxonomy = {
  _id: number;
};

type Period = {
  _id: number;
};

type DinoType = {
  _id: number;
};

type Dinosaur = {
  _id: number;
  dinosaurName: string;
  englishTranslation: string;
  period: Period;
  dinoType: DinoType;
  taxonomy: Taxonomy;
  link: string;
};

const columnHelper = createColumnHelper<Dinosaur>();

const columns = [
  columnHelper.accessor("_id", {
    id: "_id",
    header: () => "_id",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("dinosaurName", {
    id: "dinosaurName",
    header: () => "Dinosaur Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("englishTranslation", {
    id: "englishTranslation",
    header: () => "Translation",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("period._id", {
    id: "period",
    header: () => "Period",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("dinoType._id", {
    id: "dinoType",
    header: () => "Dinosaur Type",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("taxonomy._id", {
    id: "taxonomy",
    header: () => "Taxonomy",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("link", {
    id: "link",
    header: () => "Link",
    cell: (info) => info.getValue(),
  }),
];

const Home: NextPage = () => {
  const [data, setData] = useState<Dinosaur[]>([]);

  useEffect(() => {
    const queryResults = async () => {
      const results = await fetchQuery();
      console.log({ results });

      if (Array.isArray(results) && results.length > 0) {
        setData(results);
      }
    };

    queryResults();
  }, [setData]);

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
                    className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 truncate"
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
