"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { Sparkles, Volume2, VolumeX, Wind } from "lucide-react";
import { playEntranceTone } from "@/experience/sound";

const ExperienceCanvas = dynamic(
  () => import("./scene/ExperienceCanvas").then((module) => module.ExperienceCanvas),
  { ssr: false },
);

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function ExperienceShell() {
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [ready, setReady] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(14);
  const [soundOn, setSoundOn] = useState(false);
  const [visible, setVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 700px), (pointer: coarse)");
    const updateMotion = () => setReducedMotion(media.matches);
    const updateMobile = () => setIsMobile(mobile.matches);
    const initialCheck = window.setTimeout(() => {
      setWebgl(supportsWebGL());
      setLoadingProgress(32);
      updateMotion();
      updateMobile();
    }, 0);
    media.addEventListener("change", updateMotion);
    mobile.addEventListener("change", updateMobile);
    const onVisibility = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      media.removeEventListener("change", updateMotion);
      mobile.removeEventListener("change", updateMobile);
      document.removeEventListener("visibilitychange", onVisibility);
      window.clearTimeout(initialCheck);
    };
  }, []);

  const toggleSound = useCallback(() => {
    setSoundOn((value) => {
      if (!value) playEntranceTone();
      return !value;
    });
  }, []);

  const onRendererReady = useCallback(() => setLoadingProgress(72), []);
  const onSceneReady = useCallback(() => {
    setLoadingProgress(100);
    window.setTimeout(() => setReady(true), 420);
  }, []);

  if (webgl === false) {
    return (
      <main className="experience">
        <section className="fallback fallback--quiet" aria-label="The 3D museum entrance is unavailable in this browser">
          <span className="loading-screen__mark" aria-hidden="true" />
        </section>
      </main>
    );
  }

  return (
    <main className="experience" aria-label="Museum entrance">
      {webgl && (
        <ExperienceCanvas
          isMobile={isMobile}
          onRendererReady={onRendererReady}
          onSceneReady={onSceneReady}
          reducedMotion={reducedMotion}
          visible={visible}
        />
      )}

      {!ready && (
        <div className="loading-screen" role="status" aria-label={`Loading entrance: ${loadingProgress}%`}>
          <span className="loading-screen__mark" aria-hidden="true" />
          <div className="loading-track" aria-hidden="true"><span style={{ width: `${loadingProgress}%` }} /></div>
          <span className="loading-number">{loadingProgress}%</span>
        </div>
      )}

      <div className="ui-layer">
        <div className="top-controls" aria-label="Experience settings">
          <button className="icon-button" onClick={toggleSound} aria-label={soundOn ? "Turn sound off" : "Turn sound on"} aria-pressed={soundOn} title={soundOn ? "Sound on" : "Sound off"}>
            {soundOn ? <Volume2 size={19} strokeWidth={1.8} /> : <VolumeX size={19} strokeWidth={1.8} />}
          </button>
          <button className="icon-button" onClick={() => setReducedMotion((value) => !value)} aria-label={reducedMotion ? "Enable gentle motion" : "Reduce motion"} aria-pressed={reducedMotion} title="Motion preference">
            {reducedMotion ? <Wind size={19} strokeWidth={1.8} /> : <Sparkles size={19} strokeWidth={1.8} />}
          </button>
        </div>
      </div>
    </main>
  );
}
