"use client";

import React, { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let cleaned = false;

    const init = () => {
      const anime = (window as any).anime;
      if (!anime) return false;

      // Split hero title (h1) into words while preserving <br />
      const titleEl = document.getElementById("hero-title");
      if (titleEl && !(titleEl as HTMLElement).dataset.splitApplied) {
        const frag = document.createDocumentFragment();
        Array.from(titleEl.childNodes).forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            const text = (node.textContent || "");
            const parts = text.split(/(\s+)/); // keep spaces
            parts.forEach((part) => {
              if (/\s+/.test(part)) {
                frag.appendChild(document.createTextNode(part));
              } else if (part) {
                const clip = document.createElement("span");
                clip.className = "split-clip";
                const word = document.createElement("span");
                word.className = "split-word";
                word.textContent = part;
                clip.appendChild(word);
                frag.appendChild(clip);
              }
            });
          } else if ((node as HTMLElement).nodeName === "BR") {
            frag.appendChild(document.createElement("br"));
          }
        });
        titleEl.innerHTML = "";
        titleEl.appendChild(frag);
        (titleEl as HTMLElement).dataset.splitApplied = "true";

        // Animate words on the title only (one-time reveal, then stay visible)
        anime({
          targets: "#hero-title .split-word",
          translateY: [
            { value: "100%", duration: 0 },
            { value: "0%", duration: 900, easing: "easeOutCubic" },
          ],
          delay: anime.stagger(180),
          loop: false,
          complete: () => {
            document.querySelectorAll("#hero-title .split-word").forEach((el) => {
              (el as HTMLElement).style.transform = "none";
            });
          },
        });
      }

      // Hero entrance
      anime.timeline({ easing: "easeOutExpo" })
        .add({ targets: "#hero-title", opacity: [0, 1], translateY: [16, 0], duration: 700 })
        .add({ targets: '[data-animate="hero-sub"]', opacity: [0, 1], translateY: [12, 0], duration: 600 }, 100)
        .add({ targets: '[data-animate="hero-cta"]', opacity: [0, 1], translateY: [8, 0], duration: 500 }, 200)
        .add({ targets: "#hero-orbit", opacity: [0, 1], scale: [0.92, 1], duration: 800 }, 0);

      // Scroll reveal for cards
      const reveal = (selector: string) => {
        const items = document.querySelectorAll(selector);
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                anime({
                  targets: entry.target as Element,
                  opacity: [0, 1],
                  translateY: [12, 0],
                  duration: 600,
                  easing: "easeOutQuad",
                });
                io.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.15 }
        );
        items.forEach((el) => io.observe(el));
        return io;
      };

      const io1 = reveal('[data-animate="project-card"]');
      const io2 = reveal('[data-animate="process-card"]');

      // Cleanup observers on unmount
      return () => {
        io1 && io1.disconnect();
        io2 && io2.disconnect();
      };
    };

    // Try immediately; if not ready, wait for script load
    const cleanup = init();
    if (cleanup) {
      return () => {
        cleaned = true;
        typeof cleanup === "function" && cleanup();
      };
    }

    const script = document.querySelector('script[src*="anime.min.js"]');
    const onLoad = () => {
      if (!cleaned) {
        const laterCleanup = init();
        if (typeof laterCleanup === "function") {
          window.addEventListener("beforeunload", () => laterCleanup());
        }
      }
    };
    if (script) script.addEventListener("load", onLoad, { once: true });

    return () => {
      cleaned = true;
      if (script) script.removeEventListener("load", onLoad as any);
    };
  }, []);

  type Project = {
    title: string;
    role: string;
    description: string;
    icon: string;
    image: string; // path under /public
  };

  const projects: Project[] = [
    {
      title: "Structural Design Optimization – Haug Metal Structures",
      role: "Mechanical & Structural Designer",
      description:
        "Designed and analyzed steel assemblies following CSA S16-1 standards, optimizing load-bearing performance using FEA and CAD. Produced detailed structural layouts to improve efficiency and manufacturability across industrial applications.",
      icon: "architecture",
      image: "/projects/structural-design-optimization-haug-metal-structures.jpg",
    },
    {
      title: "3D Highway Infrastructure Model – Urban Design Visualization",
      role: "Mechanical & 3D Modeling Engineer",
      description:
        "Built a full-scale digital model of a highway system to simulate traffic flow, structural geometry, and environmental integration — demonstrating spatial planning, large-scale modeling, and technical visualization.",
      icon: "map",
      image: "/projects/3d-highway-infrastructure-model.jpg",
    },
    {
      title: "Quantum Computing and Analog Mechanics Concept",
      role: "Research & Concept Development Engineer",
      description:
        "Explored parallels between quantum computing logic and analog mechanical systems, translating superposition and state representation into mechanical analogs that mirror computational logic through motion and geometry.",
      icon: "science",
      image: "/projects/quantum-computing-analog-mechanics.jpg",
    },
    {
      title: "Fluid Dynamics Simulation – Personal Research",
      role: "Mechanical Analyst",
      description:
        "Ran CFD simulations to analyze airflow through mechanical components, improving aerodynamic behavior and energy efficiency through iterative analysis and design refinement.",
      icon: "water_drop",
      image: "/projects/fluid-dynamics-simulation.jpg",
    },
  ];
  return (
    <main className="min-h-screen bg-[var(--color-soft)] text-[var(--color-graphite)] font-sans">
      {/* ===== Navbar ===== */}
      <header className="sticky top-0 z-10 bg-[var(--color-soft)]/90 backdrop-blur border-b border-[var(--color-steel)]/20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="font-semibold tracking-wide text-[var(--color-steel)] text-lg">
            chrisaut
          </span>
          <nav className="space-x-6 text-sm font-medium text-[var(--color-graphite)]/80">
            <a href="#about" className="hover:text-[var(--color-steel)] transition">About</a>
            <a href="#projects" className="hover:text-[var(--color-steel)] transition">Projects</a>
            <a href="#process" className="hover:text-[var(--color-steel)] transition">Process</a>
            <a href="#contact" className="hover:text-[var(--color-steel)] transition">Contact</a>
          </nav>
        </div>
      </header>

      {/* ===== Hero Section ===== */}
      <section className="border-b border-[var(--color-steel)]/10">
        <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center px-6 py-24">
          <div>
            <h1 id="hero-title" className="text-4xl md:text-5xl font-semibold leading-tight text-[var(--color-steel)]">
              Hi, I am Chris Torres
            </h1>
            <p
              id="hero-tagline"
              data-animate="hero-sub"
              className="mt-6 text-[var(--color-graphite)]/80 font-serif max-w-prose"
            >
              I’m a mechanical engineer blending structure, creativity, and analysis — building
              systems that turn imagination into functional design.
            </p>
            <div data-animate="hero-cta" className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-steel)] text-[var(--color-soft)] hover:bg-[var(--color-amber)] hover:text-[var(--color-graphite)] transition"
              >
                <span className="material-symbols-outlined text-sm">build_circle</span>
                View Projects
              </a>
              <a
                href="#contact"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--color-steel)] text-[var(--color-steel)] hover:bg-[var(--color-soft)]/60 transition"
              >
                <span className="material-symbols-outlined text-sm">mail</span>
                Contact
              </a>
            </div>
          </div>
          <div className="hidden md:block" />
        </div>
      </section>

      {/* ===== About Section ===== */}
      <section id="about" className="border-b border-[var(--color-steel)]/10">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-semibold text-[var(--color-steel)] mb-4">About</h2>
          <p className="text-[var(--color-graphite)]/85 leading-relaxed font-serif">
            I’m a curious and detail-oriented mechanical engineer with a passion for design,
            problem-solving, and continuous improvement. I enjoy transforming ideas into practical
            solutions through creativity, precision, and analytical thinking. I value structure and
            clarity, but also exploration — constantly learning new technologies and methods that
            expand my engineering perspective.
          </p>
        </div>
      </section>

      {/* ===== Projects Section ===== */}
      <section id="projects" className="border-b border-[var(--color-steel)]/10">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="flex justify-between items-end">
            <h2 className="text-3xl font-semibold text-[var(--color-steel)]">Projects</h2>
            <a href="#" className="text-sm underline text-[var(--color-graphite)]/70 hover:text-[var(--color-steel)]">
              View all
            </a>
          </div>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <ProjectCard key={p.title} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== Process Section ===== */}
      <section id="process" className="border-b border-[var(--color-steel)]/10">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-semibold text-[var(--color-steel)] mb-8">Process</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {["Problem", "Design", "Prototype", "Analysis"].map((step) => (
              <div
                key={step}
                className="text-center border border-[var(--color-steel)]/20 rounded-xl p-6 hover:border-[var(--color-steel)]/50 transition"
                data-animate="process-card"
              >
                <span className="material-symbols-outlined text-[var(--color-amber)] text-4xl mb-3 block">
                  schema
                </span>
                <h3 className="font-semibold text-lg">{step}</h3>
                <p className="text-sm text-[var(--color-graphite)]/70 mt-2 font-serif">
                  Notes or visuals describing how each stage contributes to precision and innovation.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Contact Section ===== */}
      <section id="contact" className="bg-[var(--color-steel)] text-[var(--color-soft)]">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-semibold mb-4">Let’s Connect</h2>
          <p className="text-[var(--color-soft)]/80 max-w-prose mx-auto font-serif">
            Interested in collaboration, research, or learning more about my work? Feel free to
            reach out anytime.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <a
              href="mailto:christiantrojas97@gmail.com"
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-[var(--color-amber)] text-[var(--color-graphite)] hover:bg-[var(--color-soft)] transition"
              aria-label="Email Christian"
              title="Email Christian"
            >
              <span className="material-symbols-outlined text-base" aria-hidden="true">mail</span>
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/christian-torres997"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-lg border border-[var(--color-soft)] text-[var(--color-soft)] hover:bg-[var(--color-soft)] hover:text-[var(--color-steel)] transition"
              aria-label="Open LinkedIn profile"
              title="Open LinkedIn profile"
            >
              <span className="material-symbols-outlined text-base" aria-hidden="true">link</span>
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function ProjectCard({ p }: { p: { title: string; role: string; description: string; icon: string; image: string } }) {
  const [flipped, setFlipped] = React.useState(false);

  const toggle = (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) e.stopPropagation();
    setFlipped((v) => !v);
  };

  const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle(e);
    }
  };

  return (
    <div
      className={`flip-card rounded-2xl overflow-hidden border border-[var(--color-steel)]/20 hover:border-[var(--color-steel)]/50 transition ${
        flipped ? "is-flipped" : ""
      }`}
      data-animate="project-card"
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={flipped ? "Show project front" : "Show project details"}
      onClick={toggle}
      onKeyDown={onKey}
    >
      <div className="flip-inner min-h-[340px]">
        {/* Front */}
        <div className="flip-face flip-front bg-[var(--color-soft)] flex flex-col h-full">
          <div className="aspect-video bg-[var(--color-graphite)]/5 overflow-hidden">
            <img
              src={p.image}
              alt={p.title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-5 flex-1 flex flex-col justify-start">
            <h3 className="font-semibold mb-1 leading-snug">{p.title}</h3>
            <p className="text-xs text-[var(--color-graphite)]/60">{p.role}</p>
          </div>
        </div>
        {/* Back */}
        <div className="flip-face flip-back bg-[var(--color-soft)] flex flex-col h-full">
          <div className="p-5 flex-1 flex flex-col">
            <h3 className="font-semibold mb-2 leading-snug">{p.title}</h3>
            <p className="text-xs text-[var(--color-graphite)]/60 mb-2">{p.role}</p>
            <p className="text-sm text-[var(--color-graphite)]/75 font-serif">{p.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
