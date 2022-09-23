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
nips.stop();
await delay(2000);
const variableText = "This is variable text";
nips.start(`\${this.n.dots.spin()} ${variableText}`);
await delay(2000);
nips.start("${this.n.dots.fail()} fail spin !");
await delay(2000);
nips.start("${this.n.dots.spin()} restart spin ...");
await delay(2000);
nips.start(
  "${this.n.dots.spin()} 1st spin ...\n${this.n.arc.spin()} 2nd spin ...",
);
await delay(2000);
nips.stop(
  "${this.n.dots.success()} 1st spin success !\n${this.n.arc.fail()} 2nd spin fail ...",
);
await delay(2000);
nips.start("${this.n.arc.spin()} 2nd spin restart !");
await delay(2000);
nips.start(
  "${this.n.arc.spin()} 2nd spin ...\n${this.n.dots.spin()} 3rd start spin ...",
);
await delay(2000);
nips.stop(
  "${this.n.arc.success()} 2nd spin success !\n${this.n.dots.success()} 3rd spin success !\n",
);
await delay(2000);
nips.stop("${this.n.dots.success()} ALL SUCCESS !\n");
