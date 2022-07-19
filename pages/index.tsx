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

const Home: NextPage = () => {
  const [data, setData] = useState<object | undefined>({});

  useEffect(() => {
    const queryResults = async () => {
      const data = await fetchQuery();

      setData(data);
    };

    queryResults();
  }, [setData]);

  console.log(data);

  //takes an object
  // const table = useReactTable();

  return <div className={styles.container}></div>;
};

export default Home;
