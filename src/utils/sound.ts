// Sound utility for creating and playing various UI sound effects with volume control

type WebkitWindow = Window & {
  webkitAudioContext: typeof AudioContext;
};

class SoundManager {
  private static instance: SoundManager;
  private volume: number = 0.1;
  private isMuted: boolean = false;
  private readonly AudioContextClass: typeof AudioContext | null =
    typeof window !== "undefined"
      ? window.AudioContext ||
        (window as unknown as WebkitWindow).webkitAudioContext
      : null;

  private constructor() {}

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  public setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  public getVolume(): number {
    return this.volume;
  }

  public toggleMute(): void {
    this.isMuted = !this.isMuted;
  }

  public isSoundMuted(): boolean {
    return this.isMuted;
  }

  private createOscillator(
    frequency: number,
    type: OscillatorType = "sine",
    duration: number = 0.1,
    gainMultiplier: number = 1
  ): void {
    if (!this.AudioContextClass || this.isMuted) return;

    const audioContext = new this.AudioContextClass();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    gainNode.gain.setValueAtTime(
      this.volume * gainMultiplier,
      audioContext.currentTime
    );

    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);

    setTimeout(() => audioContext.close(), duration * 1000 + 100);
  }

  public playHoverSound(): void {
    this.createOscillator(2000, "sine", 0.05, 0.5);
  }

  public playClickSound(): void {
    this.createOscillator(1000, "sine", 0.1, 1);
  }

  public playSuccessSound(): void {
    const duration = 0.15;
    this.createOscillator(1000, "sine", duration, 1);
    setTimeout(
      () => this.createOscillator(1500, "sine", duration, 1),
      duration * 1000
    );
  }

  public playErrorSound(): void {
    const duration = 0.15;
    this.createOscillator(400, "square", duration, 1);
    setTimeout(
      () => this.createOscillator(300, "square", duration, 1),
      duration * 1000
    );
  }

  public playBootSound(): void {
    const sequence = [
      { freq: 400, duration: 0.1 },
      { freq: 600, duration: 0.1 },
      { freq: 800, duration: 0.15 },
    ];

    sequence.forEach(({ freq, duration }, index) => {
      setTimeout(
        () => this.createOscillator(freq, "sine", duration, 1),
        index * 150
      );
    });
  }

  public playMenuSound(): void {
    this.createOscillator(1200, "sine", 0.08, 0.8);
  }

  public playTypingSound(): void {
    this.createOscillator(2000, "sine", 0.02, 0.2);
  }

  public playPowerSound(powerOn: boolean): void {
    if (powerOn) {
      const duration = 0.2;
      this.createOscillator(100, "sine", duration, 1);
      setTimeout(
        () => this.createOscillator(1000, "sine", duration, 1),
        duration * 1000
      );
    } else {
      const duration = 0.2;
      this.createOscillator(1000, "sine", duration, 1);
      setTimeout(
        () => this.createOscillator(100, "sine", duration, 1),
        duration * 1000
      );
    }
  }
}

// Export a singleton instance
const soundManager = SoundManager.getInstance();

// Export individual sound functions that use the singleton
export const setVolume = (volume: number) => soundManager.setVolume(volume);
export const getVolume = () => soundManager.getVolume();
export const toggleMute = () => soundManager.toggleMute();
export const isSoundMuted = () => soundManager.isSoundMuted();
export const playHoverSound = () => soundManager.playHoverSound();
export const playClickSound = () => soundManager.playClickSound();
export const playSuccessSound = () => soundManager.playSuccessSound();
export const playErrorSound = () => soundManager.playErrorSound();
export const playBootSound = () => soundManager.playBootSound();
export const playMenuSound = () => soundManager.playMenuSound();
export const playTypingSound = () => soundManager.playTypingSound();
export const playPowerSound = (powerOn: boolean) =>
  soundManager.playPowerSound(powerOn);
