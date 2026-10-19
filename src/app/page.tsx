"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type KeyboardEvent as ReactKeyboardEvent } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  MapPin,
  Music2,
  Clock3,
  ArrowDown,
  Flower2,
  Navigation,
} from "lucide-react";
import { wedding } from "../lib/content";

function Countdown() {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const delta = Math.max(0, new Date("2026-11-21T18:00:00+05:30").getTime() - now);
  const parts: [number, string][] = [
    [Math.floor(delta / 86400000), "Days"],
    [Math.floor((delta % 86400000) / 3600000), "Hours"],
    [Math.floor((delta % 3600000) / 60000), "Minutes"],
    [Math.floor((delta % 60000) / 1000), "Seconds"],
  ];

  return (
    <div className="countdown" aria-label="Countdown to the wedding">
      {parts.map(([value, label]) => (
        <div className="count-unit" key={label}>
          <strong>{String(value).padStart(2, "0")}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

type ScratchRevealProps = {
  revealed: boolean;
  onReveal: () => void;
};

function ScratchReveal({ revealed, onReveal }: ScratchRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const keyboardStepRef = useRef(0);
  const triggeredRef = useRef(false);
  const [celebration, setCelebration] = useState(false);

  function completeReveal() {
    if (triggeredRef.current) return;
    triggeredRef.current = true;
    drawingRef.current = false;
    setCelebration(true);
    onReveal();
    window.setTimeout(() => setCelebration(false), 4200);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const paintFoil = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      const context = canvas.getContext("2d");
      if (!context) return;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const gradient = context.createLinearGradient(0, 0, rect.width, rect.height);
      gradient.addColorStop(0, "#8e672f");
      gradient.addColorStop(0.18, "#e5ca87");
      gradient.addColorStop(0.38, "#b88b42");
      gradient.addColorStop(0.58, "#f0dba3");
      gradient.addColorStop(0.78, "#aa7b38");
      gradient.addColorStop(1, "#e8d095");
      context.fillStyle = gradient;
      context.fillRect(0, 0, rect.width, rect.height);

      context.strokeStyle = "rgba(255,245,211,.42)";
      context.lineWidth = 1;
      context.strokeRect(8, 8, rect.width - 16, rect.height - 16);
      for (let x = 15; x < rect.width; x += 23) {
        for (let y = 15; y < rect.height; y += 21) {
          context.fillStyle = "rgba(255,248,220,.18)";
          context.beginPath();
          context.arc(x, y, 1, 0, Math.PI * 2);
          context.fill();
        }
      }
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillStyle = "#fff6dc";
      context.shadowColor = "rgba(70,43,10,.45)";
      context.shadowBlur = 3;
      context.font = "600 12px Arial, sans-serif";
      context.fillText("SCRATCH THE GOLD", rect.width / 2, rect.height / 2 - 8);
      context.font = "10px Arial, sans-serif";
      context.fillText("TO REVEAL OUR WEDDING DATE", rect.width / 2, rect.height / 2 + 13);
      context.shadowBlur = 0;
    };

    paintFoil();
    window.addEventListener("resize", paintFoil);
    return () => window.removeEventListener("resize", paintFoil);
  }, []);

  function scratchAt(clientX: number, clientY: number, radius = 22) {
    const canvas = canvasRef.current;
    if (!canvas || triggeredRef.current || revealed) return;
    const rect = canvas.getBoundingClientRect();
    const context = canvas.getContext("2d");
    if (!context) return;
    context.save();
    context.globalCompositeOperation = "destination-out";
    context.beginPath();
    context.arc(clientX - rect.left, clientY - rect.top, radius, 0, Math.PI * 2);
    context.fill();
    context.restore();

    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
    let sampled = 0;
    let cleared = 0;
    for (let i = 3; i < pixels.length; i += 4 * 12) {
      sampled += 1;
      if (pixels[i] < 40) cleared += 1;
    }
    if (sampled > 0 && cleared / sampled > 0.60) {
      completeReveal();
    }
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLCanvasElement>) {
    event.preventDefault();
    drawingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    scratchAt(event.clientX, event.clientY);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLCanvasElement>) {
    if (!drawingRef.current) return;
    event.preventDefault();
    scratchAt(event.clientX, event.clientY);
  }

  function handleKeyDown(event: ReactKeyboardEvent<HTMLCanvasElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const columns = 4;
      const rows = 3;
      const step = keyboardStepRef.current++ % (columns * rows);
      const column = step % columns;
      const row = Math.floor(step / columns);
      const x = rect.left + rect.width * (0.12 + column * 0.253);
      const y = rect.top + rect.height * (0.18 + row * 0.32);
      scratchAt(x, y, Math.max(44, Math.min(58, rect.width * 0.12)));
    }
  }

  return (
    <div className={`scratch-wrap ${revealed ? "is-revealed" : ""}`}>
      <div className="revealed-date" aria-live="polite" aria-hidden={!revealed}>
        <span className="date-prelude">Our Wedding Day</span>
        <strong>21</strong>
        <span className="date-month">November</span>
        <b>2026</b>
      </div>
      <canvas
        ref={canvasRef}
        className="scratch-foil"
        aria-label="Scratch the gold foil to reveal the wedding date. Press Enter or Space repeatedly to scratch using the keyboard."
        role="button"
        tabIndex={0}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={() => (drawingRef.current = false)}
        onPointerCancel={() => (drawingRef.current = false)}
        onKeyDown={handleKeyDown}
      />
      <div className={`scratch-celebration ${celebration ? "is-active" : ""}`} aria-hidden="true">
        {Array.from({ length: 20 }, (_, index) => (
          <span key={index} className={`burst-piece burst-${index + 1}`}>
            {index % 4 === 0 ? "✿" : index % 4 === 1 ? "✦" : index % 4 === 2 ? "❀" : "✧"}
          </span>
        ))}
        <span className="burst-message">The date is revealed!</span>
      </div>
    </div>
  );
}

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [entering, setEntering] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const musicRef = useRef<HTMLAudioElement>(null);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const reduce = useReducedMotion();

  function startMusicFromGesture() {
    const audio = musicRef.current;
    if (!audio) return;
    audio.volume = 0.34;
    void audio.play().then(() => setMusicPlaying(true)).catch(() => setMusicPlaying(false));
  }

  function toggleMusic() {
    const audio = musicRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.volume = 0.34;
      void audio.play().then(() => setMusicPlaying(true)).catch(() => setMusicPlaying(false));
    } else {
      audio.pause();
      setMusicPlaying(false);
    }
  }

  function openInvite() {
    if (opening || opened) return;
    setOpening(true);
    startMusicFromGesture();
    window.setTimeout(() => setEntering(true), reduce ? 40 : 2450);
    window.setTimeout(() => {
      setOpened(true);
      window.scrollTo(0, 0);
    }, reduce ? 320 : 5350);
  }



  const mapUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(wedding.venue);
  const revealMotion = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.12 },
        transition: { duration: 0.9, ease: "easeOut" as const },
      };

  return (
    <main className={opened ? "wedding-page" : "invitation-entry"}>
      <audio ref={musicRef} src="/Wedding_Card/audio/wedding-background-music.mp3" loop preload="auto" aria-label="Wedding background music selected by the couple" />
      {!opened ? (
        <section className={`intro-screen royal-gate-screen ${opening ? "gate-opening" : ""} ${entering ? "gate-entering" : ""}`}>
          <div className="intro-halo" />
          <div className="intro-flowers top-left">✿ ❧ ✿</div>
          <div className="intro-flowers bottom-right">✿ ❧ ✿</div>
          <div className="gate-stage">
            <div className="gate-depth-glow" />
            <button type="button" className="royal-gate" onClick={openInvite} disabled={opening} aria-label="Open the royal palace gates to enter the wedding invitation">
              <span className="gate-leaf gate-leaf-left">
                <span className="gate-inner-ornament gate-ganesha-plaque">
                  <Image src="/Wedding_Card/images/ganesha.webp" alt="Lord Ganesha" width={220} height={240} priority />
                  <small>With the blessings of Lord Ganesha</small>
                </span>
                <span className="gate-hinge hinge-left" />
              </span>
              <span className="gate-leaf gate-leaf-right">
                <span className="gate-inner-ornament gate-couple-plaque">
                  <span className="gate-monogram">SS</span>
                  <span className="gate-floral-divider" aria-hidden="true">✿</span>
                  <strong>Siddhant</strong>
                  <i>&amp;</i>
                  <strong>Srishti</strong>
                  <small>Invite you to celebrate</small>
                </span>
                <span className="gate-hinge hinge-right" />
              </span>
            </button>
            <div className="gate-ground-glow" />
            <div className="gate-camera-glow" />
          </div>
          <p className="gate-opening-instruction">Tap the palace gates to enter</p>
          <button className="open-button royal-gate-cta" type="button" onClick={openInvite} disabled={opening}>
            {opening ? "ENTERING THE PALACE" : "ENTER THE ROYAL PALACE"} <span>✦</span>
          </button>
          <p className="tap-note">A celebration of love · family · forever</p>
        </section>
      ) : (
        <>
          <header className="site-header">
            <a className="brand" href="#top">S <i>&</i> S</a>
            {revealed && (
              <nav aria-label="Invitation sections">
                <a href="#celebrations">Celebrations</a>
                <a href="#venue">Venue</a>
              </nav>
            )}
            <button type="button" className="music-button music-toggle" onClick={toggleMusic} aria-pressed={musicPlaying} aria-label={musicPlaying ? "Pause background music" : "Play background music"}>
              <span className="music-icon"><Music2 size={15} /></span>
              {musicPlaying ? "Music on" : "Music off"}
            </button>
          </header>

          <section id="top" className="hero">
            <div className="hero-bg" />
            <div className="hero-vignette" />
            <div className="hero-ornament ornament-left">❧</div>
            <div className="hero-ornament ornament-right">❧</div>
            <motion.div
              className="hero-copy"
              initial={reduce ? {} : { opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1 }}
            >
              <p className="eyebrow light">With the blessings of our families</p>
              <div className="hero-rule"><span>✦</span></div>
              <p className="the-wedding">We invite you to celebrate the wedding of</p>
              <h2>Siddhant <em>&</em> Srishti</h2>
              <p className="hero-invitation-line">A royal celebration of love, family and forever.</p>
              <a className="scroll-cue" href="#date"><ArrowDown size={18} /><span>Scroll to discover</span></a>
            </motion.div>
            <motion.div
              className="hero-couple"
              initial={reduce ? {} : { opacity: 0, x: 45, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              <Image src="/Wedding_Card/images/couple-portrait.png" alt="Siddhant and Srishti in their chosen wedding outfits" fill priority sizes="(max-width: 760px) 90vw, 42vw" />
            </motion.div>
            <div className="hero-bottom-caption">A JOURNEY OF LOVE · FAMILY · FOREVER</div>
          </section>

          <section id="date" className="date-reveal section-shell">
            <motion.div {...revealMotion} className="date-layout">
              <div className="date-copy">
                <p className="eyebrow">A little surprise</p>
                <h2>A day to remember.<br /><em>A lifetime together.</em></h2>
                <p>One beautiful celebration, surrounded by the people who mean the most. Scratch the golden keepsake to discover our special day.</p>
              </div>
              <div className="date-card">
                <div className="card-corner corner-one">✧</div>
                <div className="card-corner corner-two">✧</div>
                <div className="card-inner">
                  <ScratchReveal revealed={revealed} onReveal={() => setRevealed(true)} />
                  <div className="card-flourish">❧ ✦ ❧</div>
                </div>
              </div>
            </motion.div>
          </section>

          {revealed && (
          <>
          <section className="blessing section-shell">
            <motion.div {...revealMotion} className="blessing-frame">
              <div className="frame-flower"><Flower2 size={29} strokeWidth={1.2} /></div>
              <p className="eyebrow">With the blessings of our parents</p>
              <div className="parents-grid">
                <div className="parent-family">
                  <span>Groom's parents</span>
                  <h2>{wedding.groomParents}</h2>
                </div>
                <div className="parent-divider"><span>✦</span></div>
                <div className="parent-family">
                  <span>Bride's parents</span>
                  <h2>{wedding.brideParents}</h2>
                </div>
              </div>
              <div className="ornate-rule"><span>✦</span></div>
              <p className="blessing-text">Together with their families, Siddhant &amp; Srishti invite you to share in the joy of their wedding celebration.</p>
            </motion.div>
          </section>

          <section className="count-section section-shell">
            <motion.div {...revealMotion}>
              <p className="eyebrow">The celebration awaits</p>
              <h2>Counting down to forever</h2>
              <Countdown />
            </motion.div>
          </section>

          <section id="celebrations" className="events-section section-shell">
            <motion.div {...revealMotion}>
              <p className="eyebrow">The Wedding Celebrations</p>
              <h2>Five beautiful days</h2>
              <p className="section-intro">Join us for the moments, rituals and celebrations that bring our families together.</p>
              <div className="event-grid">
                {wedding.events.map((event, index) => (
                  <article className={`event-card ${event.title === "Wedding Day" ? "event-card-main" : ""}`} key={event.title}>
                    <div className="event-image">
                      <Image src={event.image} alt={`${event.title} celebration setting`} fill sizes="(max-width: 760px) 92vw, 44vw" />
                      <span className="event-image-number">0{index + 1}</span>
                    </div>
                    <div className="event-card-body">
                      <div className="event-heading-row">
                        <div className="event-date-stamp"><strong>{event.day}</strong><span>{event.month}</span><small>2026</small></div>
                        <div className="event-heading-copy">
                          <p className="event-kicker">{event.category}</p>
                          <h3>{event.title}</h3>
                          <p className="event-note">{event.note}</p>
                        </div>
                      </div>
                      {event.schedule ? (
                        <div className="wedding-schedule">
                          {event.schedule.map((item) => (
                            <div className="schedule-item" key={item.label}>
                              <span>{item.label}</span>
                              <strong>{item.time}</strong>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="event-time"><Clock3 size={15} /> {event.time}</p>
                      )}
                      <div className="event-location"><MapPin size={15} /><div><strong>{event.place}</strong><small>{event.mapLink ? <a className="event-map-link" href={event.mapLink} target="_blank" rel="noreferrer">{event.address} · Get directions</a> : event.address}</small></div></div>
                    </div>
                  </article>
                ))}
              </div>
            </motion.div>
          </section>

          <section id="venue" className="venue-section section-shell">
            <motion.div {...revealMotion} className="venue-inner">
              <div className="venue-art">
                <Image src="/Wedding_Card/images/couple-walking.webp" alt="Siddhant and Srishti walking together through a royal palace courtyard" fill sizes="(max-width: 760px) 92vw, 48vw" />
                <span className="venue-art-caption">A new journey begins</span>
              </div>
              <div className="venue-copy">
                <p className="eyebrow">The Wedding Venue</p>
                <h2>Heritage Resorts<br /><em>Barla</em></h2>
                <div className="ornate-rule"><span>✦</span></div>
                <p>Barla, Muzaffarnagar<br />Uttar Pradesh 251307, India</p>
                <a className="directions-button" href={mapUrl} target="_blank" rel="noreferrer"><Navigation size={16} /> Get Directions</a>
              </div>
            </motion.div>
          </section>

          <footer className="closing-section">
            <Image className="closing-art" src="/Wedding_Card/images/couple-seated.webp" alt="Siddhant and Srishti seated together in the palace courtyard" fill sizes="100vw" />
            <div className="closing-backdrop" />
            <div className="closing-content">
              <p className="eyebrow light">With love</p>
              <div className="closing-monogram">S <i>&amp;</i> S</div>
              <h2>Siddhant &amp; Srishti</h2>
              <p>Your presence, affection and blessings will make this new journey even more beautiful.</p>
              <div className="ornate-rule"><span>✦</span></div>
              <small>21 · 11 · 2026</small>
              <div className="closing-contact">
                <span>For any queries, please contact</span>
                <a href="tel:+917060368382">+91 7060368382</a>
                <a href="tel:+917060122652">+91 7060122652</a>
              </div>
            </div>
            <div className="petal petal-one">✿</div>
            <div className="petal petal-two">✿</div>
            <div className="petal petal-three">✿</div>
          </footer>
          </>
          )}
        </>
      )}
    </main>
  );
}
