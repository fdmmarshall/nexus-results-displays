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
    const queryData = fetchQuery();

    if (queryData) {
      console.log(queryData);
      setData(queryData);
    }
  }, [setData]);

  //takes an object
  // const table = useReactTable();

  return <div className={styles.container}></div>;
};

export default Home;
