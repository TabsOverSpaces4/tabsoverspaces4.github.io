export default function Footer() {
  return (
    <footer className="bg-[#07080f] border-t border-white/[0.06] py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <p className="text-sm text-[#4a5270]">
          AssistAI · Built as part of a research &amp; portfolio project
        </p>
        <p className="text-sm text-[#4a5270]">
          Privacy: all data stored locally. No tracking. No servers.
        </p>
      </div>
    </footer>
  );
}
