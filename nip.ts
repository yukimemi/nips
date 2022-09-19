import { ensureString } from "https://deno.land/x/unknownutil@v2.0.0/mod.ts";

export class Nip {
  private frames: string[] = [];
  private successes: string[] = [];
  private fails: string[] = [];

  private framesLen = 0;
  private successesLen = 0;
  private failsLen = 0;

  private frameIndex = -1;
  private successIndex = -1;
  private failIndex = -1;

  private spinner;
  private successer;
  private failer;

  constructor(
    frames: string[],
    successes: string[],
    fails: string[],
  ) {
    this.frames = frames;
    this.successes = successes;
    this.fails = fails;
    this.framesLen = this.frames.length;
    this.successesLen = this.successes.length;
    this.failsLen = this.fails.length;

    this.spinner = this.getSpinner();
    this.successer = this.getSuccesser();
    this.failer = this.getFailer();
  }

  private *getSpinner() {
    while (true) {
      this.frameIndex = (this.frameIndex + 1) % this.framesLen;
      yield this.frames[this.frameIndex];
    }
  }

  private *getSuccesser() {
    while (true) {
      this.successIndex = (this.successIndex + 1) % this.successesLen;
      yield this.successes[this.successIndex];
    }
  }

  private *getFailer() {
    while (true) {
      this.failIndex = (this.failIndex + 1) % this.failsLen;
      yield this.fails[this.failIndex];
    }
  }

  public spin(): string {
    return ensureString(this.spinner.next().value);
  }
  public success(): string {
    return ensureString(this.successer.next().value);
  }
  public fail(): string {
    return ensureString(this.failer.next().value);
  }
}
