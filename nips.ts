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
    this.text = "";
  }

  public clear(lineCnt = 1) {
    lineCnt -= 1;
    this.clearLine(lineCnt);
    this.text = "";
  }

  private render(text = "") {
    const lineCnt = this.text.split("\n").length - 1;
    this.text = eval("`" + text + "`");
    this.clearLine(lineCnt);
    writeAllSync(
      this.writer,
      this.textEncoder.encode(
        `\r${this.text}`,
      ),
    );
  }

  private clearLine(lineCnt: number) {
    writeAllSync(
      this.writer,
      this.textEncoder.encode(
        `${lineCnt ? `\x1b[${lineCnt}F` : ""}\x1b[0J\x1b[0K`,
      ),
    );
  }
}
