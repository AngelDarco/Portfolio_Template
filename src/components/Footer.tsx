import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  let lastScroll = 0;
  const [path] = useLocation();

  const ScrollListener = () => {
    const footer = footerRef.current;
    const currentScroll = window.innerHeight;
    const heightPage = document.documentElement.scrollHeight;
    const footerHeight = window.innerHeight * 0.1;

    if (path !== "/" || !footer) return;

    footer.style.transition = "all 0.5s ease-in-out";

    if (window.scrollY + currentScroll > heightPage - footerHeight) {
      footer.classList.add("reset");
      footer.style.transform = "translateY(0) !important";
      lastScroll = window.scrollY;
      return;
    }

    footer.classList.remove("reset");

    footer.classList.add(
      "border-b",
      "border-white/20",
      "bg-white/10",
      "shadow-lg",
      "backdrop-blur-sm",
      "border-t",
      "rounded-t-md"
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
    // eslint-disable-next-line
  }, [path]);

  return (
    <footer
      ref={footerRef}
      className={`${path !== "/" ? "footer" : "sticky"}
      bottom-0 z-50 w-full `}
    >
      <div className="flex h-full w-full items-center justify-around p-4  max-sm:flex-col">
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
    </footer>
  );
}
