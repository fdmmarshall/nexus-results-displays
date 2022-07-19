import type { NextPage } from "next";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  //takes an object
  const table = useReactTable();

  return <div className={styles.container}></div>;
};

export default Home;
