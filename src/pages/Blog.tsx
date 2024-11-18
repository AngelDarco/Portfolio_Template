export default function Blog() {
  const blogInfo = {
    title: "Our Story & Team",
    intro:
      "Welcome to our blog! Here, we share insights about our car shop, our team, and the work we do to bring you the best in car parts, tuning accessories, and more.",
    sections: [
      {
        title: "Our Store",
        content:
          "Take a look around our store! We pride ourselves on creating a welcoming, well-organized space where you can find everything you need for your vehicle, from lights and tuning parts to hardware tools and air fresheners.",
        image: "/store.jpg",
      },
      {
        title: "Meet Our Team",
        content:
          "Our dedicated team of car enthusiasts is here to help you with any questions you might have. Each team member brings unique expertise, ensuring you receive the best guidance and support.",
        image: "/team.jpg",
      },
      {
        title: "Behind the Scenes",
        content:
          "We love sharing what goes on behind the scenes! Our team is constantly working to source the best products, test new tools, and create an environment where our customers feel valued.",
        image: "/blog.jpg",
      },
    ],
  };
  return (
    <main className="flex flex-col items-center justify-center px-6 py-16 text-white">
      <h1 className="py-4 text-3xl font-bold">{blogInfo.title}</h1>
      <p className="p-6">{blogInfo.intro}</p>

      {blogInfo.sections.map((section) => (
        <section className="[&>img] flex flex-col items-center justify-center p-6 [&>h2]:text-xl [&>h2]:font-bold [&>p]:py-4">
          <h2>{section.title}</h2>
          <img src={section.image} alt={section.title} className="h-80 w-96" />
          <p>{section.content}</p>
        </section>
      ))}
    </main>
  );
}
