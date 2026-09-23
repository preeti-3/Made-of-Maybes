let audioContext: AudioContext | null = null;

function context() {
  audioContext ??= new AudioContext();
  if (audioContext.state === "suspended") void audioContext.resume();
  return audioContext;
}

function tone(frequency: number, start: number, duration: number, volume: number) {
  const ctx = context();
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(frequency, ctx.currentTime + start);
  gain.gain.setValueAtTime(0, ctx.currentTime + start);
  gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + start + 0.08);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + duration);
  oscillator.connect(gain).connect(ctx.destination);
  oscillator.start(ctx.currentTime + start);
  oscillator.stop(ctx.currentTime + start + duration + 0.05);
}

export function playEntranceTone() {
  tone(392, 0, 1.2, 0.045);
  tone(587, 0.16, 1.4, 0.03);
}

export function playActivationChime() {
  [523, 659, 784, 1047].forEach((frequency, index) => tone(frequency, index * 0.12, 1.15, 0.034));
}
