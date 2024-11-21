import { useEffect, useRef } from "react";
import { Link } from "wouter";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);

  let lastScroll = 0;
  const ScrollListener = () => {
    const header = headerRef.current;
    if (!header) return;

    header.style.transition = "all 0.5s ease-in-out";

    if (window.scrollY < window.innerHeight * 0.1) {
      header.classList.add("reset");
      return;
    }

    header.classList.remove("reset");

    header.classList.add(
      "border-b",
      "border-white/20",
      "bg-white/10",
      "text-white",
      "shadow-lg",
      "backdrop-blur-sm"
    );

    if (window.scrollY < lastScroll) {
      header.style.transform = "translateY(-100%)";
    } else {
      header.style.transform = "translateY(0)";
    }
    lastScroll = window.scrollY;
  };

  useEffect(() => {
    window.addEventListener("scroll", ScrollListener);
    return () => window.removeEventListener("scroll", ScrollListener);
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky left-0 top-0 z-50 w-full rounded-b-s text-white flex justify-around"
    >
      <nav>
        <ul className="[&>li>a]:decoration-none ] flex list-none p-4 gap-4 hover:[&>li>a]:underline">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <div className="w-full text-white">
        <Link href="admin">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="34px"
            width="34px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 14V22H4C4 17.5817 7.58172 14 12 14ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM21 17H22V22H14V17H15V16C15 14.3431 16.3431 13 18 13C19.6569 13 21 14.3431 21 16V17ZM19 17V16C19 15.4477 18.5523 15 18 15C17.4477 15 17 15.4477 17 16V17H19Z"></path>
          </svg>
        </Link>
      </div>
    </header>
  );
}
