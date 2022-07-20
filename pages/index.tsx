import type { NextPage } from "next";
import fetchQuery from "../lib/query";
import { useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import styles from "../styles/Home.module.css";

type DinosaurType = {
  types: string;
  count: number;
};

const columns: ColumnDef<DinosaurType>[] = [
  {
    accessorKey: "types",
    header: () => "Types",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  },
  {
    accessorKey: "count",
    header: () => "Count",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  },
];

const Home: NextPage = () => {
  const [data, setData] = useState<DinosaurType[]>([]);

  useEffect(() => {
    const queryResults = async () => {
      const data = await fetchQuery();

      setData(data);
    };

    queryResults();
  }, [setData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={styles.container}>
      <div className="container mx-auto sm:px-6 lg:px-8">
        {/* Content goes here */}

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
        </table>
      </div>
    </div>
  );
};

export default Home;
