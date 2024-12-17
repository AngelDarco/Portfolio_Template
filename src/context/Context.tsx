import { createContext } from "react";
import type { Data } from "../@types";

interface Context {
  data: Data[];
  setData?: React.Dispatch<React.SetStateAction<Data[]>>;
  dataRef: Data[];
  categories: Data[];
}

export const context = createContext<Context>({
  data: [],
  dataRef: [],
  categories: [],
});
