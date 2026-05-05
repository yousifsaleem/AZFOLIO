export default function About() {
  return (
    <section id="about" className="bg-stone-100 px-6 py-20 text-zinc-900 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="border-b border-zinc-300 pb-6">
          <h2 className="text-4xl tracking-[-0.03em]">About</h2>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <p className="max-w-2xl text-lg leading-8 text-zinc-700">
            Afia Zaman is a graphic designer shaping calm, characterful visual systems across
            editorial, identity and digital work. This section is a simple placeholder for a fuller
            studio story.
          </p>

          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="aspect-[4/5] border border-zinc-300 bg-stone-200"
                aria-label={`About image placeholder ${item}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
