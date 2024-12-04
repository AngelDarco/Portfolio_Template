import { useContext } from "react";
import Card from "./Card";
import { context, defaultValue } from "../context/Context";
import Add from "/add.svg";
import { Link } from "wouter";

export default function Carousel() {
  const cards = [
    { categorie: "all", img: "car.png" },
    { categorie: "bags", img: "image_1.png" },
    { categorie: "clothes", img: "image_7.png" },
    { categorie: "caps", img: "image_5.png" },
    { categorie: "cups", img: "image_6.png" },
  ];

  const { setData } = useContext(context);

  const handlerCategory = (categorie: string) => {
    const filteredData = defaultValue.filter(
      (item) => item.categorie === categorie
    );
    if (!setData) return;
    if (categorie === "all") {
      return setData(defaultValue);
    }
    setData(filteredData);
  };

  return (
    <section className="flex flex-col w-full px-4">
      <h1 className="p-4 text-2xl font-bold text-white">Categories</h1>
      <main className="no-scrollbar h-62 mb-14 flex w-full items-center justify-items-start gap-5 overflow-x-scroll relative">
        <Link
          href="admin/categories/add"
          className="absolute z-10 top-4 left-4"
        >
          <img src={Add} alt="" />
        </Link>

        {cards.map((card, index) => (
          <Card
            key={index}
            img={card.img}
            categorie={card.categorie}
            section="categories"
            styles="w-64 !h-28 min-w-40"
            onClick={() => handlerCategory(card.categorie)}
          />
        ))}
      </main>
    </section>
  );
}
