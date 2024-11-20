import { createContext, useState } from "react";

interface Data {
  img: string;
  categorie: string;
}

export const defaultValue: Data[] = [
  { img: "/image_1.png", categorie: "bags" },
  { img: "/image_2.png", categorie: "clothes" },
  { img: "image_4.png", categorie: "clothes" },
  { img: "/image_5.png", categorie: "caps" },
  { img: "/image_6.png", categorie: "cups" },
  { img: "/image_7.png", categorie: "clothes" },
  { img: "image_8.png", categorie: "cups" },
  { img: "/image_1.png", categorie: "bags" },
  { img: "/image_2.png", categorie: "clothes" },
  { img: "image_4.png", categorie: "clothes" },
  { img: "/image_5.png", categorie: "caps" },
  { img: "/image_6.png", categorie: "cups" },
  { img: "/image_7.png", categorie: "clothes" },
  { img: "image_8.png", categorie: "cups" },
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
