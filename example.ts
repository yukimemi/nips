import { delay } from "https://deno.land/std@0.156.0/async/delay.ts";
import * as colors from "https://deno.land/std@0.156.0/fmt/colors.ts";
import { Nip, Nips } from "./mod.ts";

const dots = new Nip(
  ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"].map(colors.cyan),
  ["✔"].map(colors.green),
  ["✘"].map(colors.red),
);

const arc = new Nip(
  ["◜", "◠", "◝", "◞", "◡", "◟"].map(colors.magenta),
  ["○"].map(colors.green),
  ["×"].map(colors.red),
);

const nips = new Nips({
  interval: 70,
  n: { dots, arc },
});

nips.start("${this.n.dots.spin()} start spin ...");
await delay(2000);
nips.start("${this.n.dots.fail()} fail spin !");
await delay(2000);
nips.start("${this.n.dots.spin()} restart spin ...");
await delay(2000);
nips.start(
  "${this.n.dots.spin()} first spin ...\n${this.n.arc.spin()} second spin ...",
);
await delay(2000);
nips.start(
  "${this.n.dots.success()} first spin success !\n${this.n.arc.fail()} second spin fail ...",
);
await delay(2000);
nips.stop(
  "${this.n.dots.success()} first spin success !\n${this.n.arc.success()} second spin success !",
);
