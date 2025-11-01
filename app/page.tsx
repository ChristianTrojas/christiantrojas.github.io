// app/page.tsx
export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Nav */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <span className="font-semibold">Christian Torres</span>
          <nav className="space-x-6 text-sm">
            <a href="#about" className="hover:opacity-70">About</a>
            <a href="#projects" className="hover:opacity-70">Projects</a>
            <a href="#process" className="hover:opacity-70">Process</a>
            <a href="#contact" className="hover:opacity-70">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b">
        <div className="mx-auto max-w-6xl px-6 py-20 grid gap-10 md:grid-cols-2 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
              Engineering Precision,<br/>Designed for Curiosity.
            </h1>
            <p className="mt-4 text-gray-600 max-w-prose">
              Mechanical engineer blending structure, clarity, and innovation to translate ideas into
              practical, elegant systems.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#projects" className="px-4 py-2 rounded-lg border bg-black text-white">View Projects</a>
              <a href="#contact" className="px-4 py-2 rounded-lg border">Contact</a>
            </div>
          </div>
          <div className="h-56 md:h-72 rounded-2xl border grid place-items-center">
            {/* Placeholder for rotating geometric motif */}
            <span className="text-gray-400 text-sm">Rotational Motif / Portrait</span>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-b">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="text-2xl font-semibold">About</h2>
          <p className="mt-4 text-gray-700">
            I’m a curious and detail-oriented mechanical engineer with a passion for problem-solving,
            precision, and continuous improvement. I see engineering as a bridge between imagination
            and reality.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="border-b">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-semibold">Selected Projects</h2>
            <a className="text-sm underline" href="#">See all</a>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({length:6}).map((_,i)=>(
              <article key={i} className="rounded-2xl border overflow-hidden group">
                <div className="aspect-video bg-gray-100 grid place-items-center">
                  <span className="text-gray-400 text-sm">Image / Render</span>
                </div>
                <div className="p-4">
                  <h3 className="font-medium">Project Title</h3>
                  <p className="text-sm text-gray-600">Short description of challenge → result.</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="border-b">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-semibold">Process</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-4">
            {["Problem","Design","Prototype","Analysis"].map((step)=>(
              <div key={step} className="rounded-xl border p-4 text-center">
                <div className="font-medium">{step}</div>
                <p className="text-xs text-gray-600 mt-2">Notes about this stage.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="text-2xl font-semibold">Get in touch</h2>
          <p className="mt-4 text-gray-700">Let’s collaborate. I’m open to research, engineering roles, and design projects.</p>
          <div className="mt-6 flex gap-3">
            <a href="mailto:christiantrojas97@gmail.com" className="px-4 py-2 rounded-lg border bg-black text-white">Email</a>
            <a href="https://www.linkedin.com/in/christian-torres997" className="px-4 py-2 rounded-lg border">LinkedIn</a>
          </div>
        </div>
      </section>
    </main>
  );
}
