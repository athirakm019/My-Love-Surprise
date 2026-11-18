// Romantic Piano & Ambient Harmony Web Audio Synthesizer + Audio Player

class RomanticAudioController {
  private ctx: AudioContext | null = null;
  private isSynthesizing: boolean = false;
  private timerId: number | null = null;
  private volumeNode: GainNode | null = null;
  private masterVolume: number = 0.65;
  private isMuted: boolean = false;
  private externalAudio: HTMLAudioElement | null = null;
  private step: number = 0;

  // Chord progression: Fmaj7 -> Cmaj7 -> Dm7 -> Bbmaj7 (tender, deeply romantic)
  private chords = [
    [174.61, 220.00, 261.63, 329.63, 392.00, 523.25], // F3, A3, C4, E4, G4, C5
    [130.81, 164.81, 196.00, 246.94, 293.66, 392.00], // C3, E3, G3, B3, D4, G4
    [146.83, 174.61, 220.00, 261.63, 349.23, 440.00], // D3, F3, A3, C4, F4, A4
    [116.54, 146.83, 174.61, 233.08, 293.66, 349.23], // Bb2, D3, F3, Bb3, D4, F4
  ];

  private melodyNotes = [
    523.25, 587.33, 659.25, 587.33, 523.25, 440.00, 392.00, 440.00,
    523.25, 659.25, 783.99, 659.25, 587.33, 523.25, 440.00, 392.00
  ];

  constructor() {
    // AudioContext is initialized on first user interaction
  }

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.volumeNode = this.ctx.createGain();
      this.volumeNode.gain.setValueAtTime(this.isMuted ? 0 : this.masterVolume, this.ctx.currentTime);
      this.volumeNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a soft bell/piano tone
  private playSoftTone(freq: number, duration: number, gainValue: number, delaySec: number = 0) {
    if (!this.ctx || !this.volumeNode) return;

    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Soft warm sound using sine + warm low-pass filter
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime + delaySec);

    // Warmth filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(850, this.ctx.currentTime + delaySec);

    // Piano-style envelope (gentle attack, smooth exponential decay)
    const startTime = this.ctx.currentTime + delaySec;
    noteGain.gain.setValueAtTime(0.0001, startTime);
    noteGain.gain.exponentialRampToValueAtTime(gainValue * 0.35, startTime + 0.08);
    noteGain.gain.exponentialRampToValueAtTime(gainValue * 0.15, startTime + 0.4);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.volumeNode);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.1);
  }

  private scheduleNextMeasure = () => {
    if (!this.isSynthesizing || !this.ctx) return;

    const currentChordIndex = Math.floor(this.step / 8) % this.chords.length;
    const chord = this.chords[currentChordIndex];
    const beatInChord = this.step % 8;

    // Arpeggio bass note on downbeat
    if (beatInChord === 0) {
      this.playSoftTone(chord[0], 2.8, 0.45);
      this.playSoftTone(chord[1], 2.5, 0.35, 0.1);
      this.playSoftTone(chord[2], 2.2, 0.3, 0.2);
    }

    // Mid arpeggio notes
    const midNoteIndex = (beatInChord % (chord.length - 2)) + 2;
    this.playSoftTone(chord[midNoteIndex], 1.8, 0.22);

    // Delicate fairy sparkle chime occasionally
    if (this.step % 2 === 0) {
      const melodyIndex = (this.step / 2) % this.melodyNotes.length;
      this.playSoftTone(this.melodyNotes[melodyIndex], 1.5, 0.15, 0.25);
    }

    this.step++;
    this.timerId = window.setTimeout(this.scheduleNextMeasure, 450); // ~66 BPM
  };

  public play(customUrl?: string) {
    this.initContext();

    if (customUrl && customUrl.trim() !== '') {
      if (!this.externalAudio) {
        this.externalAudio = new Audio(customUrl);
        this.externalAudio.loop = true;
      } else if (this.externalAudio.src !== customUrl) {
        this.externalAudio.src = customUrl;
      }
      this.externalAudio.volume = this.isMuted ? 0 : this.masterVolume;
      this.externalAudio.play().catch(e => {
        console.warn("External audio playback error, falling back to synth:", e);
        this.startSynth();
      });
      return;
    }

    this.startSynth();
  }

  private startSynth() {
    if (this.isSynthesizing) return;
    this.isSynthesizing = true;
    this.scheduleNextMeasure();
  }

  public pause() {
    this.isSynthesizing = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.externalAudio) {
      this.externalAudio.pause();
    }
  }

  public setVolume(val: number) {
    this.masterVolume = Math.max(0, Math.min(1, val));
    if (this.volumeNode && this.ctx && !this.isMuted) {
      this.volumeNode.gain.setValueAtTime(this.masterVolume, this.ctx.currentTime);
    }
    if (this.externalAudio && !this.isMuted) {
      this.externalAudio.volume = this.masterVolume;
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    const target = this.isMuted ? 0 : this.masterVolume;
    if (this.volumeNode && this.ctx) {
      this.volumeNode.gain.setValueAtTime(target, this.ctx.currentTime);
    }
    if (this.externalAudio) {
      this.externalAudio.volume = target;
    }
    return this.isMuted;
  }

  public getIsPlaying(): boolean {
    return this.isSynthesizing || (this.externalAudio !== null && !this.externalAudio.paused);
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getVolume(): number {
    return this.masterVolume;
  }
}

export const romanticAudio = new RomanticAudioController();
