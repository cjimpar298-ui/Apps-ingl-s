// Web Audio API Sound Effects Engine for Classroom Projection Mode

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  } catch {
    return null;
  }
}

/**
 * Subtle and engaging activity transition chime.
 * Generates an elegant ascending dual-harmonic bell tone (e.g., F#5 -> B5).
 */
export function playActivityTransitionSound(enabled: boolean = true) {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    // First tone (Harmonic note 1)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(659.25, now); // E5
    osc1.frequency.exponentialRampToValueAtTime(783.99, now + 0.08); // G5

    gain1.gain.setValueAtTime(0.001, now);
    gain1.gain.linearRampToValueAtTime(0.18, now + 0.02);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.22);

    // Second sparkle tone (Harmonic note 2 slightly delayed)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(987.77, now + 0.06); // B5
    osc2.frequency.exponentialRampToValueAtTime(1174.66, now + 0.16); // D6

    gain2.gain.setValueAtTime(0.001, now + 0.06);
    gain2.gain.linearRampToValueAtTime(0.15, now + 0.08);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc2.start(now + 0.06);
    osc2.stop(now + 0.28);
  } catch {
    // Graceful fallback for audio restrictions
  }
}

/**
 * Positive celebration sound when marking an activity as done.
 */
export function playActivityCompletedSound(enabled: boolean = true) {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5

    notes.forEach((freq, i) => {
      const startTime = now + i * 0.07;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.2, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.24);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.25);
    });
  } catch {
    // Ignore audio errors
  }
}

/**
 * Subtle tactile click / tap sound when clicking card or navigating
 */
export function playCardTapSound(enabled: boolean = true) {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(260, now + 0.05);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.06);
  } catch {
    // Ignore audio errors
  }
}

/**
 * Triumphant celebration fanfare when finishing the LAST programmed activity of the session.
 * Features an energetic rising major fanfare + triumphant victory chord with glockenspiel sparkle.
 */
export function playSessionVictorySound(enabled: boolean = true) {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    // 1. Ascending energetic trumpet-like major fanfare (C4, E4, G4, C5, E5, G5, C6)
    const fanfareNotes = [
      { freq: 261.63, time: 0, duration: 0.12, gain: 0.22 },     // C4
      { freq: 329.63, time: 0.09, duration: 0.12, gain: 0.22 },  // E4
      { freq: 392.00, time: 0.18, duration: 0.12, gain: 0.24 },  // G4
      { freq: 523.25, time: 0.27, duration: 0.15, gain: 0.26 },  // C5
      { freq: 659.25, time: 0.38, duration: 0.15, gain: 0.28 },  // E5
      { freq: 783.99, time: 0.49, duration: 0.18, gain: 0.30 },  // G5
      { freq: 1046.50, time: 0.62, duration: 0.70, gain: 0.32 }  // C6 (Triumphant long note)
    ];

    fanfareNotes.forEach(({ freq, time, duration, gain }) => {
      const startTime = now + time;
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gainNode.gain.setValueAtTime(0.001, startTime);
      gainNode.gain.linearRampToValueAtTime(gain, startTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.05);
    });

    // 2. Resonant Victory Harmony Chord at peak (C5 + E5 + G5 + C6)
    const chordStartTime = now + 0.62;
    const victoryChord = [523.25, 659.25, 783.99, 1046.50, 1318.51];

    victoryChord.forEach((freq) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, chordStartTime);

      gainNode.gain.setValueAtTime(0.001, chordStartTime);
      gainNode.gain.linearRampToValueAtTime(0.2, chordStartTime + 0.04);
      gainNode.gain.exponentialRampToValueAtTime(0.001, chordStartTime + 0.9);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(chordStartTime);
      osc.stop(chordStartTime + 0.95);
    });

    // 3. Sparkle magical glockenspiel cascade (high celebration chime trills)
    const sparkles = [1318.51, 1567.98, 1760.00, 2093.00, 2637.02];
    sparkles.forEach((freq, idx) => {
      const sparkleTime = now + 0.75 + idx * 0.06;
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, sparkleTime);

      gainNode.gain.setValueAtTime(0.001, sparkleTime);
      gainNode.gain.linearRampToValueAtTime(0.18, sparkleTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, sparkleTime + 0.35);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(sparkleTime);
      osc.stop(sparkleTime + 0.38);
    });

  } catch {
    // Ignore audio errors
  }
}

/**
 * Backward compatibility alias for session finished sound
 */
export function playSessionFinishedSound(enabled: boolean = true) {
  playSessionVictorySound(enabled);
}
