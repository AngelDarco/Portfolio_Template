import { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";
import Typewriter from "typewriter-effect/dist/core";

export default function Main() {
  const tiltRef = useRef(null);
  const typewriterRef = useRef(null);

  useEffect(() => {
    if (tiltRef.current) {
      VanillaTilt.init(tiltRef.current, {
        speed: 600,
        perspective: 500,
      });
    }

    if (typewriterRef.current) {
      new Typewriter(typewriterRef.current, {
        strings: ["Hello", " world!"],
        loop: true,
        autoStart: true,
      });
    }
  }, [tiltRef, typewriterRef]);

  return (
    <main className="flex h-screen w-full -mt-8 flex-col-reverse items-center justify-center rounded-md border border-white/10 md:flex-row [&>section]:flex [&>section]:h-full [&>section]:w-full">
      <section className="flex items-center">
        <img ref={tiltRef} src="/car.png" alt="main-img" />
      </section>
      <section className="flex flex-col items-center justify-center max-md:!h-2/5">
        <h1 className="text-3xl font-bold text-white">Hello world!</h1>
        <p ref={typewriterRef} className="text-white"></p>
      </section>
    </main>
  );
}
