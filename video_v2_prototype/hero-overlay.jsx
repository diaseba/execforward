/* eslint-disable */
/* Hero Overlay — sistema de escenas sincronizado con el <video> de fondo */

const { useState, useEffect, useRef, useMemo } = React;

// ─── TIMELINE — orquesta lo que sale en pantalla y cuándo ─────────────
// Copy refinado siguiendo best practices de hero video premium:
//  · frases cortas y aisladas (kinetic typography)
//  · pausa dramática entre el setup ("el problema") y el giro
//  · énfasis tipográfico/color en la PALABRA-PIVOTE
//  · CTA final que combina logo + headline + URL + micro-pruebas
const TIMELINE = [
  // Acto 1 — Hook (frustración)
  { id: 'hook',      tIn: 2.0,  tOut: 7.5,  kind: 'phrase',
    eyebrow: '— Conoces la escena',
    lines: ['Mandaste 60 CVs.', 'Nada.'],
    accent: 'Nada.' },

  { id: 'reframe',   tIn: 8.5,  tOut: 14.0, kind: 'phrase',
    lines: ['El problema no eres', '<em>tú</em>.'] },

  // Acto 2 — Insight (el mercado oculto)
  { id: 'stat',      tIn: 15.5, tOut: 22.0, kind: 'stat',
    big: '70%',
    label: 'de los cargos ejecutivos\nnunca se publican.' },

  { id: 'mirror',    tIn: 23.0, tOut: 29.0, kind: 'phrase',
    lines: ['Compites en el 30% visible.', 'Con todos los demás.'],
    dimSecond: true },

  // Acto 3 — El giro (la promesa)
  { id: 'pivot1',    tIn: 33.0, tOut: 37.5, kind: 'phrase',
    lines: ['No necesitas más esfuerzo.'] },

  { id: 'pivot2',    tIn: 38.5, tOut: 44.0, kind: 'phrase',
    lines: ['Necesitas un <em>sistema</em>.'],
    big: true },

  // Acto 4 — Producto
  { id: 'brand',     tIn: 46.0, tOut: 53.0, kind: 'brand-reveal',
    tagline: 'El sistema de posicionamiento ejecutivo.' },

  { id: 'modules',   tIn: 53.5, tOut: 59.5, kind: 'modules',
    items: ['Propuesta de valor', 'Mercado objetivo', 'CV y LinkedIn',
            'Red de contactos', 'Pitch y negociación', 'Plan de ejecución'] },

  // Acto 5 — CTA
  { id: 'cta',       tIn: 60.5, tOut: 75.0, kind: 'cta-card' },
];

// ─── Hook: lee currentTime del <video> en cada frame ───────────────────
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

// ─── Phase calculator: in/active/out con margen de transición ─────────
const FADE = 0.55; // segundos de entrada/salida
function phaseOf(t, sc) {
  if (t < sc.tIn - FADE || t > sc.tOut + FADE) return 'hidden';
  if (t < sc.tIn) return 'enter';
  if (t < sc.tOut) return 'active';
  return 'exit';
}

// ─── Render helper: aplica énfasis (<em>) renderizado como span teal ─
function renderLine(html, variant) {
  // Reemplaza <em>...</em> por span con clase de énfasis
  const parts = html.split(/(<em>[^<]+<\/em>)/g);
  return parts.map((part, i) => {
    const m = part.match(/^<em>([^<]+)<\/em>$/);
    if (m) return <span key={i} className={`accent accent--${variant}`}>{m[1]}</span>;
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

// ─── Scene components — uno por kind ──────────────────────────────────

function PhraseScene({ sc, variant, phase }) {
  const big = sc.big;
  return (
    <div className={`scene scene--phrase scene--${variant} phase-${phase} ${big ? 'is-big' : ''}`}>
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
  return (
    <div className={`scene scene--stat scene--${variant} phase-${phase}`}>
      <div className="stat-big">{sc.big}</div>
      <div className="stat-label">
        {sc.label.split('\n').map((l, i) => (
          <div key={i} className={i === 1 ? 'accent--' + variant + ' stat-label__accent' : ''}
               style={{ '--stagger': `${i * 0.15}s` }}>{l}</div>
        ))}
      </div>
    </div>
  );
}

function BrandReveal({ sc, variant, phase, logoVariant }) {
  const logo = logoVariant === 'isotipo'
    ? 'assets/EF_logo_isotipo_light.svg'
    : 'assets/EF_logo_horizontal_light.svg';
  return (
    <div className={`scene scene--brand scene--${variant} phase-${phase}`}>
      <div className={`brand-logo brand-logo--${logoVariant}`}>
        <img src={logo} alt="ExecForward" />
      </div>
      <div className="brand-tagline">{sc.tagline}</div>
    </div>
  );
}

function ModulesScene({ sc, variant, phase }) {
  return (
    <div className={`scene scene--modules scene--${variant} phase-${phase}`}>
      <div className="modules-eyebrow">Seis módulos. Un sistema.</div>
      <div className="modules-grid">
        {sc.items.map((it, i) => (
          <div key={i} className="module-chip" style={{ '--stagger': `${i * 0.08}s` }}>
            <span className="chip-num">M{i + 1}</span>
            <span className="chip-label">{it}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CTACard({ sc, variant, phase, logoVariant }) {
  // En la card CTA (que tiene su propio fondo) usamos siempre horizontal —
  // queremos que se lea claramente la marca como cierre.
  const logo = logoVariant === 'isotipo'
    ? 'assets/EF_logo_isotipo_light.svg'
    : 'assets/EF_logo_horizontal_light.svg';
  return (
    <div className={`scene scene--cta scene--${variant} phase-${phase}`}>
      <div className="cta-card">
        <img className={`cta-logo cta-logo--${logoVariant}`} src={logo} alt="ExecForward" />
        <div className="cta-headline">Empieza con el diagnóstico gratuito.</div>
        <div className="cta-pill">execforward.com<span className="cta-arrow">→</span></div>
        <div className="cta-proof">
          <span>Gratis</span><span className="cta-dot"></span>
          <span>5 minutos</span><span className="cta-dot"></span>
          <span>Sin email</span>
        </div>
      </div>
    </div>
  );
}

function SceneRouter({ sc, variant, phase, logoVariant }) {
  switch (sc.kind) {
    case 'phrase':       return <PhraseScene sc={sc} variant={variant} phase={phase} />;
    case 'stat':         return <StatScene sc={sc} variant={variant} phase={phase} />;
    case 'brand-reveal': return <BrandReveal sc={sc} variant={variant} phase={phase} logoVariant={logoVariant} />;
    case 'modules':      return <ModulesScene sc={sc} variant={variant} phase={phase} />;
    case 'cta-card':     return <CTACard sc={sc} variant={variant} phase={phase} logoVariant={logoVariant} />;
    default: return null;
  }
}

// ─── Watermark ────────────────────────────────────────────────────────
function Watermark({ visible, t, logoVariant }) {
  // Se oculta durante la escena de marca y la CTA final para no duplicar
  const hide = (t >= 45 && t <= 53) || t >= 60;
  if (!visible || hide) return null;
  const src = logoVariant === 'isotipo'
    ? 'assets/EF_logo_isotipo_light.svg'
    : 'assets/EF_logo_horizontal_light.svg';
  return (
    <div className={`watermark watermark--${logoVariant}`}>
      <img src={src} alt="" />
    </div>
  );
}

// ─── Controls — scrubber + scene chips ────────────────────────────────
function Controls({ videoRef, t, duration, showScrubber }) {
  const [playing, setPlaying] = useState(true);
  useEffect(() => {
    const v = videoRef.current; if (!v) return;
    const onP = () => setPlaying(true);
    const onPa = () => setPlaying(false);
    v.addEventListener('play', onP);
    v.addEventListener('pause', onPa);
    return () => {
      v.removeEventListener('play', onP);
      v.removeEventListener('pause', onPa);
    };
  }, [videoRef]);

  const toggle = () => {
    const v = videoRef.current; if (!v) return;
    if (v.paused) v.play(); else v.pause();
  };

  const jump = (sec) => {
    const v = videoRef.current; if (!v) return;
    v.currentTime = sec;
    v.play();
  };

  const onScrub = (e) => {
    const v = videoRef.current; if (!v) return;
    v.currentTime = parseFloat(e.target.value);
  };

  return (
    <div className="controls">
      <button className="ctrl-btn" onClick={toggle} aria-label={playing ? 'Pausar' : 'Reproducir'}>
        {playing
          ? <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><rect x="2" y="1" width="3" height="12" rx="1"/><rect x="9" y="1" width="3" height="12" rx="1"/></svg>
          : <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M3 1.5v11l9-5.5z"/></svg>}
      </button>
      <div className="time">{fmt(t)} <span className="time-sep">/</span> {fmt(duration)}</div>
      {showScrubber && (
        <input className="scrubber" type="range" min="0" max={duration || 75} step="0.05" value={t} onChange={onScrub} />
      )}
      <div className="chips">
        {TIMELINE.map(s => (
          <button key={s.id} className={`chip ${t >= s.tIn && t < s.tOut ? 'chip--on' : ''}`}
                  onClick={() => jump(s.tIn)} title={`${fmt(s.tIn)} — ${s.id}`}>
            {s.id}
          </button>
        ))}
      </div>
    </div>
  );
}

function fmt(s) {
  if (!Number.isFinite(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

// ─── Main stage ───────────────────────────────────────────────────────
function HeroVideoStage({ variant, showWatermark, dimBg, showScrubber, muted, hideV1Subs, logoVariant }) {
  const videoRef = useRef(null);
  const [duration, setDuration] = useState(75);
  const [videoSrc, setVideoSrc] = useState(null);
  const t = useVideoTime(videoRef);

  // Carga el video como Blob URL para garantizar seekable=full en el preview
  useEffect(() => {
    let cancelled = false;
    let blobUrl = null;
    (async () => {
      try {
        const res = await fetch('assets/V1_hero_final.mp4');
        const blob = await res.blob();
        if (cancelled) return;
        blobUrl = URL.createObjectURL(blob);
        setVideoSrc(blobUrl);
      } catch (e) {
        if (!cancelled) setVideoSrc('assets/V1_hero_final.mp4');
      }
    })();
    return () => {
      cancelled = true;
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, []);

  useEffect(() => {
    const v = videoRef.current; if (!v) return;
    const onMeta = () => setDuration(v.duration || 75);
    v.addEventListener('loadedmetadata', onMeta);
    return () => v.removeEventListener('loadedmetadata', onMeta);
  }, [videoSrc]);

  const active = TIMELINE.filter(sc => phaseOf(t, sc) !== 'hidden');

  return (
    <div className="stage-wrap">
      <div className={`stage variant--${variant} ${dimBg ? 'is-dim' : ''}`}>
        {videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            muted={muted}
            loop
            playsInline
            className="bg-video"
          />
        ) : (
          <div className="bg-video bg-loading">Cargando video…</div>
        )}
        <div className="scrim" />
        {hideV1Subs && <div className="v1-subs-mask" />}
        <Watermark visible={showWatermark} t={t} logoVariant={logoVariant} />
        <div className="overlay">
          {active.map(sc => (
            <SceneRouter key={sc.id} sc={sc} variant={variant} phase={phaseOf(t, sc)} logoVariant={logoVariant} />
          ))}
        </div>
      </div>
      <Controls videoRef={videoRef} t={t} duration={duration} showScrubber={showScrubber} />
    </div>
  );
}

// ─── App + Tweaks ─────────────────────────────────────────────────────
function App() {
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "variant": "kinetic",
    "logoVariant": "horizontal",
    "showWatermark": true,
    "dimBg": true,
    "hideV1Subs": false,
    "showScrubber": true,
    "muted": true
  }/*EDITMODE-END*/;
  const [t, setT] = useTweaks(TWEAK_DEFAULTS);

  return (
    <>
      <HeroVideoStage
        variant={t.variant}
        logoVariant={t.logoVariant}
        showWatermark={t.showWatermark}
        dimBg={t.dimBg}
        hideV1Subs={t.hideV1Subs}
        showScrubber={t.showScrubber}
        muted={t.muted}
      />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Variación de overlay" />
        <TweakSelect
          label="Estilo"
          value={t.variant}
          onChange={v => setT('variant', v)}
          options={[
            { value: 'kinetic',   label: 'A · Kinetic Center' },
            { value: 'editorial', label: 'B · Editorial Left' },
            { value: 'caption',   label: 'C · Caption Bottom' },
          ]}
        />
        <TweakSection label="Logo" />
        <TweakSelect
          label="Variante"
          value={t.logoVariant}
          onChange={v => setT('logoVariant', v)}
          options={[
            { value: 'horizontal', label: 'Horizontal (chevron + wordmark)' },
            { value: 'isotipo',    label: 'Solo isotipo (chevrones)' },
          ]}
        />
        <TweakToggle label="Watermark visible" value={t.showWatermark} onChange={v => setT('showWatermark', v)} />
        <TweakSection label="Capas" />
        <TweakToggle label="Tapar subtítulos viejos del V1" value={t.hideV1Subs} onChange={v => setT('hideV1Subs', v)} />
        <TweakToggle label="Scrim sobre video" value={t.dimBg} onChange={v => setT('dimBg', v)} />
        <TweakSection label="Reproducción" />
        <TweakToggle label="Silenciar audio" value={t.muted} onChange={v => setT('muted', v)} />
        <TweakToggle label="Mostrar scrubber" value={t.showScrubber} onChange={v => setT('showScrubber', v)} />
      </TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
