import type { NextPage } from "next";
import SidePanel from "../components/SidePanel";
import Table from "../components/Table";
import VBTable from "../components/VBTable";
import fetchVBQuery from "../lib/variableQuery";
import fetchQuery from "../lib/query";
import refQuery from "../lib/refQuery";
import { Dinosaur, Predicate, Results } from "../types/props";
import { useEffect, useState, useCallback } from "react";

const Home: NextPage = () => {
  const [data, setData] = useState<Dinosaur[]>([]);
  const [openModal, setModalState] = useState<boolean>(false);
  const [refData, setRefData] = useState<object[]>([]);
  const [schemaData, setSchemaData] = useState<Predicate[]>([]);
  const [userColumnPreds, setUserColumnPreds] = useState<string[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [arrayResults, setArrayResults] = useState<Array<Results>>([]);

  const extractPredicates = (data: Dinosaur[]) => {
    data.map((dinoObject) => {
      const keys: string[] = Object.keys(dinoObject);
      setUserColumnPreds(keys);
    });
  };

  const refButtonClick: (value: number) => Promise<void> = useCallback(
    async (refValue: number) => {
      const refResults = await refQuery(refValue);

      if (Object.keys(refResults).length > 0) {
        setRefData(refResults);
        setModalState(!openModal);
      }
    },
    [openModal]
  );

  useEffect(() => {
    const variableBindingResults = async () => {
      const results = await fetchVBQuery();
      const columns = results?.pop();
      const arrayResults = results?.pop();

      if (Array.isArray(arrayResults) && arrayResults.length > 0) {
        setColumns(columns);
        setArrayResults(arrayResults);
      }
    };

    const queryResults = async () => {
      const results = await fetchQuery();

      const userData = results?.pop();

      const schemaData = results?.pop();

      setSchemaData(schemaData);

      if (Array.isArray(results)) {
        setData(userData);
        extractPredicates(userData);
      }
    };

    queryResults();
    variableBindingResults();
  }, []);

  console.log(columns);
  console.log(arrayResults);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <SidePanel
        showModal={openModal}
        setModalState={setModalState}
        refObject={refData}
      />
      <Table
        data={data}
        refButtonClick={refButtonClick}
        predicates={schemaData}
        queryPredicates={userColumnPreds}
      />
      <VBTable variableBindings={columns} data={arrayResults} />
    </div>
  );
};

export default Home;
