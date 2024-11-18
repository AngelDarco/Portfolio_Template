import { useEffect, useRef } from "react";
export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  let lastScroll = 0;

  const ScrollListener = () => {
    const footer = footerRef.current;
    const currentScroll = window.innerHeight;
    const heightPage = document.documentElement.scrollHeight;
    const footerHeight = window.innerHeight * 0.1;

    if (!footer) return;

    footer.style.transition = "all 0.5s ease-in-out";

    if (window.scrollY + currentScroll > heightPage - footerHeight) {
      footer.style.all = "revert";
      footer.style.transform = "translateY(0)";
      lastScroll = window.scrollY;
      return;
    }

    footer.style.removeProperty("all");

    footer.classList.add(
      "border-b",
      "border-white/20",
      "bg-white/10",
      "shadow-lg",
      "backdrop-blur-sm"
    );

    if (window.scrollY > lastScroll) {
      footer.style.transform = "translateY(100%)";
    } else {
      footer.style.transform = "translateY(0)";
    }
    lastScroll = window.scrollY;
  };

  useEffect(() => {
    window.addEventListener("scroll", ScrollListener);
    return () => window.removeEventListener("scroll", ScrollListener);
  }, []);

  return (
    <main
      ref={footerRef}
      className="sticky bottom-0 left-0 z-50 w-full border-t border-white/20 bg-white/10  shadow-lg backdrop-blur-sm rounded-t-md"
    >
      <div className="flex h-full w-full items-center justify-around p-5  max-sm:flex-col">
        <p className="w-full text-left">
          Copyright &copy; {new Date().getFullYear()}
        </p>
        <h3 className="w-full text-right">
          Programed and designed by:{" "}
          <b>
            <a
              className="text-green-500"
              href="https://darco.vercel.app/"
              target="_blank"
            >
              agp
            </a>
          </b>
        </h3>
      </div>
    </main>
  );
}
