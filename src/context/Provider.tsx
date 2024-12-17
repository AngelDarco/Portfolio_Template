import { useEffect, useRef, useState } from "react";
import Database from "../firebase/realtime-db";
import Notify from "../utils/Notify";
import { context } from "./Context";
import { Data } from "../@types";

export default function StoreProvider({ children }: { children: JSX.Element }) {
  const [data, setData] = useState([] as Data[]);
  const db = new Database();
  const PRODUCTS_PATH = "products/";
  const dataRef = useRef<Data[]>([]);

  const categories = useRef<Data[]>([]);
  const CATEGORIES_PATH = "categories/";

  useEffect(() => {
    // read categories data
    db.read(CATEGORIES_PATH).then((data) => {
      categories.current = data as Data[];
    });

    // read products data
    db.read(PRODUCTS_PATH)
      .then((data) => {
        if (typeof data === "string") return Notify.error(data);
        dataRef.current = data;
        setData(data as Data[]);
      })
      .catch((err) => Notify.error(err.message));
    // eslint-disable-next-line
  }, []);

  return (
    <context.Provider
      value={{
        data,
        setData,
        dataRef: dataRef.current,
        categories: categories.current,
      }}
    >
      {children}
    </context.Provider>
  );
}
