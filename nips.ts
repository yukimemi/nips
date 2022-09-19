import { writeAllSync } from "https://deno.land/std@0.156.0/streams/conversion.ts";
import { Nip } from "./nip.ts";

export type NipsOption = Partial<Nips>;
export type NipsList = {
  [name: string]: Nip;
};

export class Nips {
  private intervalId = 0;
  private textEncoder = new TextEncoder();

  public n: NipsList = {};
  public interval = 100;
  public text = "";
  public writer = Deno.stderr;

  constructor(option: NipsOption) {
    Object.assign(this, option);
  }

  public start(text: string) {
    this.stop();
    this.intervalId = setInterval(() => {
      this.render(text);
    }, this.interval);
    return this;
  }

  public stop(text = "") {
    clearInterval(this.intervalId);
    this.render(text);
  }

  private render(text = "") {
    const evalText = eval("`" + text + "`");
    writeAllSync(
      this.writer,
      this.textEncoder.encode(`\x1b[0f${evalText}`),
    );
  }
}