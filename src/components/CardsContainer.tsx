import Card from "./Card";
export default function CardsContainer() {
  const items = [
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

  return (
    <main className="auto flex w-full flex-wrap items-center justify-center gap-4 p-4">
      {items.map((item, index) => (
        <Card key={index} img={item.img} icon />
      ))}
    </main>
  );
}
