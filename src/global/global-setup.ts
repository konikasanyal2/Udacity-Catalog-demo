import { isBstackLocal } from "../../src/utils/env";
import { bsLocal, BS_LOCAL_ARGS } from "../base/fixture";
import chalk from "chalk";

async function globalSetup() {
  console.log("global setup", isBstackLocal);
  if (isBstackLocal) {
    console.log(
      chalk.magenta("---------------Global set up started--------------"),
    );
    console.log(
      chalk.yellow("Establishing browserstack local tunnel connection.."),
    );
    // @ts-expect-error startSync is missing from types
    bsLocal.startSync(BS_LOCAL_ARGS);

    if (bsLocal.isRunning()) {
      console.log(chalk.green("Browserstack Local STARTED.."));
    } else {
      throw new Error("Browserstack Local is not started. Try Again..");
    }
    console.log(
      chalk.magenta("--------------Global set up done------------------"),
    );
  }
}

export default globalSetup;
