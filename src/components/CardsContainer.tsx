import { useContext } from "react";
import { context } from "../context/Context";
import Card from "./Card";

export default function CardsContainer() {
  const { data } = useContext(context);

  return (
    <main className="flex w-full min-h-dvh flex-wrap justify-center  gap-4 p-4">
      {data &&
        data.map((item, index) => (
          <Card key={index} img={item.img} icon admin uid={item.uid} />
        ))}
    </main>
  );
}
