import { useEffect, useRef } from "react";
import { Link } from "wouter";
import Add from "/add.svg";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className="w-full flex items-center">
        <Link href="admin/products/add">
          <img src={Add} alt="" />
        </Link>
      </div>
    </header>
  );
}
