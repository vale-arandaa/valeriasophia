import Starfield from "./Starfield";

export default function CosmicField({
  variant = "default",
  className = "",
}: {
  variant?: "default" | "dense" | "quiet";
  className?: string;
}) {
  const density = variant === "dense" ? 1.6 : variant === "quiet" ? 0.6 : 1;

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div
        className="absolute -left-1/4 -top-1/3 h-[70%] w-[70%] rounded-full opacity-40 blur-[110px] animate-float-slow"
        style={{
          background:
            "radial-gradient(circle, rgba(110,123,255,0.35) 0%, rgba(110,123,255,0) 70%)",
        }}
      />
      <div
        className="absolute -bottom-1/3 -right-1/4 h-[60%] w-[60%] rounded-full opacity-30 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(84,95,217,0.3) 0%, rgba(84,95,217,0) 70%)",
          animationDelay: "-3s",
        }}
      />
      <Starfield density={density} />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,6,10,0) 0%, rgba(5,6,10,0.4) 70%, rgba(5,6,10,1) 100%)",
        }}
      />
    </div>
  );
}
