// A cinematic light flash, not a glowing object. The softness comes from
// one large, many-stop radial gradient whose alpha decays gradually across
// seven stops (real bokeh/flare falloff) baked directly into a generously
// sized shape, rather than a small box blown up with `filter: blur()`.
// Blur + mix-blend-mode forces the browser to composite the element on an
// isolated layer, and that layer's backing buffer has a hard edge — visible
// as a faint rectangle against a near-black background, especially once a
// transform (the sweep) is animating it. Baking the falloff into the
// gradient itself has no such edge: it mathematically reaches zero alpha
// well inside the element's own box. A tiny offset cluster adds irregularity
// right at the brightest point, and one hot pixel supplies the "intensely
// bright" specular point. Violet is confined to the outermost, faintest
// stops only.
export default function HeroLightBeam() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-48 w-[130%] max-w-[480px] -translate-x-1/2 -translate-y-1/2 overflow-hidden sm:h-72 sm:w-[155%] sm:max-w-[920px]"
    >
      <div className="animate-beam-sweep absolute inset-0">
        {/* the atmosphere: large, soft, gradually fading, slightly
            elongated in the direction of travel */}
        <div
          className="absolute left-0 top-1/2 h-32 w-44 -translate-x-1/2 -translate-y-1/2 sm:h-44 sm:w-64"
          style={{
            background:
              "radial-gradient(ellipse, #ffffff 0%, rgba(255,255,255,0.85) 6%, rgba(255,255,255,0.45) 14%, rgba(255,255,255,0.2) 24%, rgba(210,218,255,0.09) 38%, rgba(180,190,255,0.03) 55%, transparent 75%)",
          }}
        />

        {/* a small irregular cluster right at the hottest point, so the
            brightest area has no single traceable circular edge */}
        <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span
            className="absolute rounded-full"
            style={{
              left: -8,
              top: -4,
              width: 16,
              height: 16,
              background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, transparent 70%)",
            }}
          />
          <span
            className="absolute rounded-full"
            style={{
              left: 3,
              top: 4,
              width: 13,
              height: 13,
              background: "radial-gradient(circle, rgba(255,255,255,0.85) 0%, transparent 70%)",
            }}
          />
          <span
            className="absolute rounded-full"
            style={{
              left: -3,
              top: -1,
              width: 8,
              height: 8,
              background: "radial-gradient(circle, #fff 0%, transparent 75%)",
            }}
          />
        </div>

        {/* the hot pixel: the single brightest, smallest point */}
        <span
          className="absolute rounded-full"
          style={{
            left: -1.5,
            top: "50%",
            transform: "translateY(-1.5px)",
            width: 3,
            height: 3,
            background: "#ffffff",
          }}
        />
      </div>
    </div>
  );
}
