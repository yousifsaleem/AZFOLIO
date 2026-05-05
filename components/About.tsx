export default function About() {
  return (
    <section id="about" className="bg-[#f5ede1] px-6 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-6xl items-center lg:min-h-screen">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <div className="aspect-[4/5] border border-zinc-300 bg-stone-100 p-4">
            <div className="flex h-full items-end justify-between">
              <span className="type-meta text-zinc-500">Supporting image 1</span>
              <span className="type-meta text-zinc-400">01</span>
            </div>
          </div>

          <div className="aspect-[4/5] border border-zinc-300 bg-[#e6ddd0] p-4">
            <div className="flex h-full items-end justify-between">
              <span className="type-meta text-zinc-500">Main portrait</span>
              <span className="type-meta text-zinc-400">02</span>
            </div>
          </div>

          <div className="aspect-[4/5] border border-zinc-300 bg-[#f1ebe2] p-4 md:col-span-2 lg:col-span-1">
            <div className="flex h-full items-end justify-between">
              <span className="type-meta text-zinc-500">Supporting image 2</span>
              <span className="type-meta text-zinc-400">03</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
