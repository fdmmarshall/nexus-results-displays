import type { NextPage } from "next";
import SidePanel from "../components/SidePanel";
import Table from "../components/Table";
import fetchQuery from "../lib/query";
import refQuery from "../lib/refQuery";
import { Dinosaur, Predicate } from "../types/props";
import { useEffect, useState, useCallback } from "react";

const Home: NextPage = () => {
  const [data, setData] = useState<Dinosaur[]>([]);
  const [openModal, setModalState] = useState<boolean>(false);
  const [refData, setRefData] = useState<object[]>([]);
  const [schemaData, setSchemaData] = useState<Predicate[]>([]);

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
    const queryResults = async () => {
      const results = await fetchQuery();

      const userData = results?.pop();

      const schemaData = results?.pop();

      setSchemaData(schemaData);

      if (Array.isArray(results)) {
        setData(userData);
      }
    };

    queryResults();
  }, []);

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
      />
    </div>
  );
};

export default Home;
