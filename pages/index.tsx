import type { NextPage } from "next";
import SidePanel from "../components/SidePanel";
import Table from "../components/Table";
import fetchQuery from "../lib/query";
import refQuery from "../lib/refQuery";
import { useEffect, useState, useCallback } from "react";

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
  const [openModal, setModalState] = useState<boolean>(false);
  const [refData, setRefData] = useState<object[]>([{}]);

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
      <Table data={data} refButtonClick={refButtonClick} />
    </div>
  );
};

export default Home;
