import { useContext } from "react";
import Card from "./Card";
import { context } from "../context/Context";

export default function Carousel() {
  const cards = [
    { title: "Music", img: "image_1.png" },
    { title: "Lights", img: "image_2.png" },
    { title: "Tools", img: "image_4.png" },
    { title: "Stickers", img: "image_5.png" },
  ];
  const data = useContext(context);
  console.log(data);
  return (
    <>
      <h1 className="p-4 text-2xl font-bold text-white">Categories</h1>
      <main className="no-scrollbar h-62 mb-14 flex w-full items-center justify-center gap-5 overflow-x-scroll">
        {cards.map((card, index) => (
          <Card
            key={index}
            img={card.img}
            title={card.title}
            styles="w-64 !h-28 min-w-40 "
          />
        ))}
      </main>
    </>
  );
}
