/* eslint-disable */
/* ExecForward · Overlay Engine (data-driven)
 *
 * No contiene copy ni timeline. Recibe un objeto `timeline` con la forma:
 *
 *   {
 *     meta:   { title, duration, aspect: '16:9'|'9:16'|'1:1', video?: 'path/to.mp4' },
 *     scenes: [
 *       { id, tIn, tOut, kind: 'phrase'|'stat'|'brand-reveal'|'modules'|'cta-card', ...props }
 *     ]
 *   }
 *
 * Y opciones de presentación:
 *
 *   variant: 'kinetic'|'editorial'|'caption'
 *   logoVariant: 'horizontal'|'isotipo'
 *   brandTagline, brandLogoLight, brandLogoDark   // override por video
 *   ctaHeadline, ctaUrl, ctaProof: [str,str,str]
 *   showWatermark, dimBg, hideWmDuring: [[tIn,tOut], ...]
 *
 * Uso:
 *   <EFOverlayEngine timeline={timeline} variant="kinetic" logoVariant="horizontal" ... />
 */

const { useState, useEffect, useRef } = React;

// ─── Time hook ────────────────────────────────────────────────────────
function useVideoTime(videoRef) {
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf;
    const tick = () => {
      const v = videoRef.current;
      if (v) setT(v.currentTime);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [videoRef]);
  return t;
}

const FADE = 0.55;
function phaseOf(t, sc) {
  if (t < sc.tIn - FADE || t > sc.tOut + FADE) return 'hidden';
  if (t < sc.tIn) return 'enter';
  if (t < sc.tOut) return 'active';
  return 'exit';
}

// Renderiza <em>...</em> dentro de una línea como span con clase de acento
function renderLine(html, variant) {
  const parts = String(html).split(/(<em>[^<]+<\/em>)/g);
  return parts.map((part, i) => {
    const m = part.match(/^<em>([^<]+)<\/em>$/);
    if (m) return <span key={i} className={`ef-accent ef-accent--${variant}`}>{m[1]}</span>;
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

// ─── Scene components ─────────────────────────────────────────────────
function PhraseScene({ sc, variant, phase }) {
  return (
    <div className={`ef-scene ef-scene--phrase ef-scene--${variant} phase-${phase} ${sc.big ? 'is-big' : ''}`}>
      {sc.eyebrow && <div className="eyebrow">{sc.eyebrow}</div>}
      {sc.lines.map((line, i) => (
        <div key={i}
             className={`line ${sc.dimSecond && i === 1 ? 'line--dim' : ''} ${sc.accent === line ? 'line--accent' : ''}`}
             style={{ '--stagger': `${i * 0.12}s` }}>
          {renderLine(line, variant)}
        </div>
      ))}
    </div>
  );
}

function StatScene({ sc, variant, phase }) {
  const labelLines = String(sc.label || '').split('\n');
  return (
    <div className={`ef-scene ef-scene--stat ef-scene--${variant} phase-${phase}`}>
      <div className="stat-big">{sc.big}</div>
      <div className="stat-label">
        {labelLines.map((l, i) => (
          <div key={i}
               className={i === (sc.labelAccentLine ?? 1) ? 'stat-label__accent' : ''}
               style={{ '--stagger': `${i * 0.15}s` }}>
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}

function BrandReveal({ sc, variant, phase, logoVariant, brandLogoLight, brandTagline }) {
  const logo = brandLogoLight || (logoVariant === 'isotipo'
    ? '../../_system/brand/EF_logo_isotipo_light.svg'
    : '../../_system/brand/EF_logo_horizontal_light.svg');
  return (
    <div className={`ef-scene ef-scene--brand ef-scene--${variant} phase-${phase}`}>
      <div className={`brand-logo brand-logo--${logoVariant}`}>
        <img src={logo} alt="ExecForward" />
      </div>
      {(sc.tagline || brandTagline) && (
        <div className="brand-tagline">{sc.tagline || brandTagline}</div>
      )}
    </div>
  );
}

function ModulesScene({ sc, variant, phase }) {
  const eyebrow = sc.eyebrow || 'Seis módulos. Un sistema.';
  return (
    <div className={`ef-scene ef-scene--modules ef-scene--${variant} phase-${phase}`}>
      <div className="modules-eyebrow">{eyebrow}</div>
      <div className="modules-grid">
        {sc.items.map((it, i) => (
          <div key={i} className="module-chip" style={{ '--stagger': `${i * 0.08}s` }}>
            <span className="chip-num">{sc.numPrefix ? `${sc.numPrefix}${i + 1}` : `M${i + 1}`}</span>
            <span className="chip-label">{it}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CTACard({ sc, variant, phase, logoVariant, brandLogoLight, ctaHeadline, ctaUrl, ctaProof }) {
  const logo = brandLogoLight || (logoVariant === 'isotipo'
    ? '../../_system/brand/EF_logo_isotipo_light.svg'
    : '../../_system/brand/EF_logo_horizontal_light.svg');
  const headline = sc.headline || ctaHeadline || 'Empieza con el diagnóstico gratuito.';
  const url = sc.url || ctaUrl || 'execforward.com';
  const proof = sc.proof || ctaProof || ['Gratis', '5 minutos', 'Sin email'];
  return (
    <div className={`ef-scene ef-scene--cta ef-scene--${variant} phase-${phase}`}>
      <div className="cta-card">
        <img className={`cta-logo cta-logo--${logoVariant}`} src={logo} alt="ExecForward" />
        <div className="cta-headline">{headline}</div>
        <div className="cta-pill">{url}<span className="cta-arrow">→</span></div>
        <div className="cta-proof">
          {proof.map((p, i) => (
            <React.Fragment key={i}>
              <span>{p}</span>
              {i < proof.length - 1 && <span className="cta-dot"></span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

function SceneRouter(props) {
  switch (props.sc.kind) {
    case 'phrase':       return <PhraseScene {...props} />;
    case 'stat':         return <StatScene {...props} />;
    case 'brand-reveal': return <BrandReveal {...props} />;
    case 'modules':      return <ModulesScene {...props} />;
    case 'cta-card':     return <CTACard {...props} />;
    default: return null;
  }
}

// ─── Watermark ────────────────────────────────────────────────────────
function Watermark({ visible, t, logoVariant, hideRanges, brandLogoLight }) {
  if (!visible) return null;
  const hide = (hideRanges || []).some(([a, b]) => t >= a && t <= b);
  if (hide) return null;
  const src = brandLogoLight || (logoVariant === 'isotipo'
    ? '../../_system/brand/EF_logo_isotipo_light.svg'
    : '../../_system/brand/EF_logo_horizontal_light.svg');
  return (
    <div className={`ef-watermark ef-watermark--${logoVariant}`}>
      <img src={src} alt="" />
    </div>
  );
}

// ─── Controls (scrubber + scene chips) ────────────────────────────────
function fmt(s) {
  if (!Number.isFinite(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

function Controls({ videoRef, t, duration, scenes, showScrubber }) {
  const [playing, setPlaying] = useState(true);
  useEffect(() => {
    const v = videoRef.current; if (!v) return;
    const onP = () => setPlaying(true);
    const onPa = () => setPlaying(false);
    v.addEventListener('play', onP);
    v.addEventListener('pause', onPa);
    return () => { v.removeEventListener('play', onP); v.removeEventListener('pause', onPa); };
  }, [videoRef]);

  const toggle = () => { const v = videoRef.current; if (!v) return; v.paused ? v.play() : v.pause(); };
  const jump = (sec) => { const v = videoRef.current; if (!v) return; v.currentTime = sec; v.play(); };
  const onScrub = (e) => { const v = videoRef.current; if (!v) return; v.currentTime = parseFloat(e.target.value); };

  return (
    <div className="ef-controls">
      <button className="ef-ctrl-btn" onClick={toggle} aria-label={playing ? 'Pausar' : 'Reproducir'}>
        {playing
          ? <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><rect x="2" y="1" width="3" height="12" rx="1"/><rect x="9" y="1" width="3" height="12" rx="1"/></svg>
          : <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M3 1.5v11l9-5.5z"/></svg>}
      </button>
      <div className="ef-time">{fmt(t)} <span className="ef-time-sep">/</span> {fmt(duration)}</div>
      {showScrubber && (
        <input className="ef-scrubber" type="range" min="0" max={duration || 75} step="0.05" value={t} onChange={onScrub} />
      )}
      <div className="ef-chips">
        {scenes.map(s => (
          <button key={s.id} className={`ef-chip ${t >= s.tIn && t < s.tOut ? 'ef-chip--on' : ''}`}
                  onClick={() => jump(s.tIn)} title={`${fmt(s.tIn)} — ${s.id}`}>
            {s.id}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Main engine component ────────────────────────────────────────────
function EFOverlayEngine({
  timeline,
  variant = 'kinetic',
  logoVariant = 'horizontal',
  showWatermark = true,
  dimBg = true,
  showScrubber = true,
  muted = true,
  brandLogoLight,
  brandTagline,
  ctaHeadline,
  ctaUrl,
  ctaProof,
  watermarkHideRanges,
  // Si quieres ocultar el video del DOM mientras se itera diseño (sin clip aún)
  hideVideo = false,
}) {
  const videoRef = useRef(null);
  const [duration, setDuration] = useState(timeline.meta?.duration || 75);
  const [videoSrc, setVideoSrc] = useState(null);
  const t = useVideoTime(videoRef);

  const aspect = timeline.meta?.aspect || '16:9';
  const scenes = timeline.scenes || [];

  // Resolve hide ranges (default: ocultar wm durante brand-reveal y cta)
  const resolvedHideRanges = watermarkHideRanges || scenes
    .filter(s => s.kind === 'brand-reveal' || s.kind === 'cta-card')
    .map(s => [s.tIn - 1, s.tOut + 1]);

  // Cargar video como blob para seekable
  useEffect(() => {
    if (hideVideo || !timeline.meta?.video) { setVideoSrc(null); return; }
    let cancelled = false;
    let blobUrl = null;
    (async () => {
      try {
        const res = await fetch(timeline.meta.video);
        const blob = await res.blob();
        if (cancelled) return;
        blobUrl = URL.createObjectURL(blob);
        setVideoSrc(blobUrl);
      } catch (e) {
        if (!cancelled) setVideoSrc(timeline.meta.video);
      }
    })();
    return () => { cancelled = true; if (blobUrl) URL.revokeObjectURL(blobUrl); };
  }, [timeline.meta?.video, hideVideo]);

  useEffect(() => {
    const v = videoRef.current; if (!v) return;
    const onMeta = () => setDuration(v.duration || timeline.meta?.duration || 75);
    v.addEventListener('loadedmetadata', onMeta);
    return () => v.removeEventListener('loadedmetadata', onMeta);
  }, [videoSrc, timeline.meta?.duration]);

  // Si no hay video, simular el tiempo con un ticker (modo diseño puro)
  useEffect(() => {
    if (videoSrc || hideVideo === false) return;
    // No-op: useVideoTime ya devuelve 0; en modo sin video, mostrar todas las escenas activas
  }, [videoSrc, hideVideo]);

  const active = scenes.filter(sc => phaseOf(t, sc) !== 'hidden');

  return (
    <div className="ef-stage-wrap">
      <div className={`ef-stage variant--${variant} ${dimBg ? 'is-dim' : ''}`} data-aspect={aspect}>
        {videoSrc ? (
          <video ref={videoRef} src={videoSrc} autoPlay muted={muted} loop playsInline className="ef-bg-video" />
        ) : (
          <div className="ef-bg-video ef-bg-loading">
            {timeline.meta?.video ? 'Cargando video…' : 'Sin clip de fondo · modo diseño'}
          </div>
        )}
        <div className="ef-scrim" />
        <Watermark visible={showWatermark} t={t} logoVariant={logoVariant}
                   hideRanges={resolvedHideRanges} brandLogoLight={brandLogoLight} />
        <div className="ef-overlay">
          {active.map(sc => (
            <SceneRouter key={sc.id} sc={sc} variant={variant} phase={phaseOf(t, sc)}
                         logoVariant={logoVariant}
                         brandLogoLight={brandLogoLight}
                         brandTagline={brandTagline}
                         ctaHeadline={ctaHeadline}
                         ctaUrl={ctaUrl}
                         ctaProof={ctaProof} />
          ))}
        </div>
      </div>
      <Controls videoRef={videoRef} t={t} duration={duration} scenes={scenes} showScrubber={showScrubber} />
    </div>
  );
}

// Exponer al global para que otros scripts de Babel lo usen
window.EFOverlayEngine = EFOverlayEngine;
