export default function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-transparent">
      <div className="relative mx-auto min-h-[120px] max-w-[1600px] px-0 py-8">
        <nav className="type-meta absolute left-[-4rem] top-8 text-zinc-600">
          <div className="space-y-4">
            {[
              { href: "#about", label: "Info", number: "01" },
              { href: "#work", label: "Work", number: "02" },
              { href: "#archive", label: "Archive", number: "03" },
              { href: "#contact", label: "Contact", number: "04" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group flex cursor-pointer items-center gap-3 text-zinc-700 transition-all duration-300 ease-out hover:translate-x-1 hover:text-amber-600"
              >
                <span className="font-semibold">{item.number}</span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </nav>

        <div className="absolute right-[-4rem] top-8 max-w-[360px] text-right">
          <div className="type-meta grid grid-cols-[auto_auto] gap-x-8 text-zinc-600">
            <div className="space-y-2 text-left text-zinc-950">
              <div className="text-[1rem] font-semibold tracking-[0.12em] normal-case">Afia Zaman</div>
              <div className="text-zinc-500">Graphic Designer</div>
            </div>
            <div className="space-y-2 text-right">
              <div className="text-[1rem] font-semibold tracking-[0.12em] text-zinc-950">22:30</div>
              <div className="text-zinc-500">04.05.2026</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
