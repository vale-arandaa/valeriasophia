export default function Wordmark({
  size = "nav",
  className = "",
}: {
  size?: "nav" | "large";
  className?: string;
}) {
  const sizes =
    size === "large"
      ? "text-4xl sm:text-5xl md:text-6xl"
      : "text-xl sm:text-2xl";

  return (
    <span
      className={`inline-flex items-baseline font-semibold tracking-[0.14em] ${sizes} ${className}`}
    >
      <span>VLOUX</span>
      <span className="ml-[0.02em] font-extralight text-gradient-accent tracking-[0.18em]">
        E
      </span>
    </span>
  );
}
