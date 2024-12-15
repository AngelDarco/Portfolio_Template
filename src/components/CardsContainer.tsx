import { useContext } from "react";
import { context } from "../context/Context";
import Card from "./Card";

export default function CardsContainer() {
  const { data } = useContext(context);

  return (
    <main className="flex w-full min-h-dvh flex-wrap justify-center border border-white/10 rounded-md gap-4 p-4">
      {data &&
        data.map((item) => (
          <Card
            key={item.uid}
            img={item.img}
            icon
            admin
            uid={item.uid}
            section="products"
          />
        ))}
    </main>
  );
}
