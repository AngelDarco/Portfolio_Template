import { useContext, useEffect, useState } from "react";
import Card from "./Card";
import { context } from "../context/Context";
import Add from "/add.svg";
import { Link } from "wouter";
import { Data } from "../@types";

export default function Carousel() {
  const [cards, setCards] = useState<Data[]>([]);
  const { setData, dataRef, categories } = useContext(context);

  useEffect(() => {
    setCards(categories);
  }, [categories]);

  const handlerCategory = (categorie: string) => {
    if (!setData) return;
    if (Object.entries(dataRef).length > 0) {
      const filteredData = dataRef.filter(
        (item) => item.categorie === categorie
      );
      setData(filteredData);
    }

    if (categorie === "all") return setData(dataRef);
  };

  return (
    <section className="flex flex-col w-full px-4 relative border border-white/10 rounded-md">
      <h1 className="p-4 text-2xl font-bold text-white">Categories</h1>
      <main className="no-scrollbar h-40 px-3 py-2 mb-14 flex w-full items-center justify-items-start gap-5 overflow-x-scroll bg-white/10 rounded-md">
        <Link
          href="admin/categories/add"
          className="absolute z-10 top-6 right-6"
        >
          <img src={Add} alt="" />
        </Link>

        {cards.map((card, index) => (
          <Card
            key={index}
            img={card.img}
            categorie={card.categorie}
            section="categories"
            styles="w-64 !h-full min-w-40"
            onClick={() => handlerCategory(card.categorie)}
          />
        ))}
      </main>
    </section>
  );
}
