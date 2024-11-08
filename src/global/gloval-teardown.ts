// global-teardown.js
import { isBstackLocal } from "../../src/utils/env";
import { bsLocal } from "../base/fixture";
import { promisify } from "node:util";
import chalk from "chalk";

const sleep = promisify(setTimeout);

module.exports = async () => {
  if (isBstackLocal) {
    console.log(
      chalk.magenta("---------------Global tear down started--------------"),
    );
    console.log(chalk.yellow("Killing browserstack local tunnel connection.."));
    let localStopped = false;
    if (bsLocal && bsLocal.isRunning()) {
      bsLocal.stop(() => {
        localStopped = true;
        console.log(chalk.green("Browserstack Local STOPPED.."));
        console.log(
          chalk.magenta(
            "---------------Global tear down done------------------",
          ),
        );
      });
      while (!localStopped) {
        await sleep(1000);
      }
    }
  }
};
