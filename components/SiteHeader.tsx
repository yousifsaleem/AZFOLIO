export default function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-transparent">
      <div className="mx-auto flex max-w-[1600px] items-start justify-between gap-6 px-6 py-5 sm:px-8 lg:relative lg:min-h-[120px] lg:px-0 lg:py-8">
        <nav className="type-meta text-zinc-600 lg:absolute lg:left-[-4rem] lg:top-8">
          <div className="flex flex-wrap gap-x-4 gap-y-2 sm:gap-x-5 lg:block lg:space-y-4">
            {[
              { href: "#about", label: "Info", number: "01" },
              { href: "#work", label: "Work", number: "02" },
              { href: "#archive", label: "Archive", number: "03" },
              { href: "#contact", label: "Contact", number: "04" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group flex cursor-pointer items-center gap-2 text-zinc-700 transition-all duration-300 ease-out hover:translate-x-1 hover:text-amber-600 sm:gap-3"
              >
                <span className="font-semibold">{item.number}</span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </nav>

        <div className="max-w-[170px] text-right sm:max-w-[220px] lg:absolute lg:right-[-4rem] lg:top-8 lg:max-w-[360px]">
          <div className="type-meta grid grid-cols-1 gap-y-3 text-zinc-600 sm:grid-cols-[auto_auto] sm:gap-x-6 lg:gap-x-8">
            <div className="space-y-1 text-right sm:text-left lg:text-left">
              <div className="text-[0.85rem] font-semibold tracking-[0.12em] normal-case text-zinc-950 sm:text-[1rem]">
                Afia Zaman
              </div>
              <div className="text-zinc-500">Graphic Designer</div>
            </div>
            <div className="space-y-1 text-right">
              <div className="text-[0.85rem] font-semibold tracking-[0.12em] text-zinc-950 sm:text-[1rem]">
                22:30
              </div>
              <div className="text-zinc-500">04.05.2026</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
