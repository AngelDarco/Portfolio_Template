import { createContext, useState } from "react";

const defaultValue = [
  { img: "/image_1.png" },
  { img: "/image_2.png" },
  { img: "image_4.png" },
  { img: "/image_5.png" },
  { img: "/image_6.png" },
  { img: "/image_7.png" },
  { img: "image_8.png" },
  { img: "/image_1.png" },
  { img: "/image_2.png" },
  { img: "image_4.png" },
  { img: "/image_5.png" },
  { img: "/image_6.png" },
  { img: "/image_7.png" },
  { img: "image_8.png" },
];

export const context = createContext(defaultValue);

export default function StoreProvider({ children }) {
  const [data, setData] = useState(defaultValue);
  console.log(data);
  return (
    <context.Provider value={[data, setData]}>{children}</context.Provider>
  );
}
