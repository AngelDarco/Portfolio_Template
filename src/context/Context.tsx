import { createContext, useState } from "react";

interface Data {
  uid:string;
  img: string;
  categorie: string;
}

export const defaultValue: Data[] = [
  {uid: "01", img: "/image_1.png", categorie: "bags" },
  {uid: "02", img: "/image_2.png", categorie: "clothes" },
  {uid: "03", img: "image_4.png", categorie: "clothes" },
  {uid: "04", img: "/image_5.png", categorie: "caps" },
  {uid: "05", img: "/image_6.png", categorie: "cups" },
  {uid: "06", img: "/image_7.png", categorie: "clothes" },
  {uid: "07", img: "image_8.png", categorie: "cups" },
  {uid: "08", img: "/image_1.png", categorie: "bags" },
  {uid: "09", img: "/image_2.png", categorie: "clothes" },
  {uid: "10", img: "image_4.png", categorie: "clothes" },
  {uid: "11", img: "/image_5.png", categorie: "caps" },
  {uid: "12", img: "/image_6.png", categorie: "cups" },
  {uid: "13", img: "/image_7.png", categorie: "clothes" },
  {uid: "14", img: "image_8.png", categorie: "cups" },
];

interface Context {
  data: typeof defaultValue;
  setData?: React.Dispatch<React.SetStateAction<Data[]>>;
}

export const context = createContext<Context>({ data: defaultValue });

export default function StoreProvider({ children }: { children: JSX.Element }) {
  const [data, setData] = useState(defaultValue);
  return (
    <context.Provider value={{ data, setData }}>{children}</context.Provider>
  );
}
