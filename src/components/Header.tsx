import { useEffect, useRef } from "react";

{
  /* <header id="header" className="fixed left-0 top-0 z-50 w-full p-4 text-white">
  <nav>
    <ul
      className="[&>li>a]:decoration-none ] flex list-none gap-4 hover:[&>li>a]:underline"
    >
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/blog">Blog</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </nav>
</header>


<script>
  (() => {
    let lastScroll = 0;
    const headerHeight = window.innerHeight * 0.1;
    const header = document.getElementById("header") as HTMLElement;
    if (!header) return;
    header.style.transition = "all 0.3s ease-in-out";

    window.addEventListener("scroll", () => {
      if (window.scrollY < headerHeight) {
        header.classList.add("header-top");
        header.style.transform = "translateY(0)";
        lastScroll = window.scrollY;
        return;
      }

      header.classList.remove("header-top");

      header.classList.add("border-b");
      header.classList.add("border-white/20");
      header.classList.add("bg-white/10");
      header.classList.add("p-4");
      header.classList.add("text-white");
      header.classList.add("shadow-lg");
      header.classList.add("backdrop-blur-sm");

      if (window.scrollY < lastScroll) {
        header.style.transform = "translateY(-100%)";
      } else {
        header.style.transform = "translateY(0)";
      }
      lastScroll = window.scrollY;
    });
  })();
</script>

<style>
  .header-top {
    all: revert;
    color: white;
    padding: 1rem;
    z-index: 50;
  }
</style>
 */
}

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);

  let lastScroll = 0;
  const ScrollListener = () => {
    const header = headerRef.current;
    if (!header) return;

    header.style.transition = "all 0.5s ease-in-out";

    if (window.scrollY < window.innerHeight * 0.1) {
      header.style.all = "revert";
      return;
    }

    header.style.removeProperty("all");

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
      className="sticky left-0 top-0 z-50 w-full text-white"
    >
      <nav>
        <ul className="[&>li>a]:decoration-none ] flex list-none p-4 gap-4 hover:[&>li>a]:underline">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/blog">Blog</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
