import { createContainer } from "@ogre-tools/injectable";
import { execInjectable } from "./exec.injectable";
import { doWebpackBuildInjectable } from "./do-webpack-build";
import { logSuccessInjectable } from "./log-success.injectable";
import { logWarningInjectable } from "./log-warning.injectable";

export const getDi = () => {
  const di = createContainer("do-webpack-build");

  di.register(execInjectable, doWebpackBuildInjectable, logSuccessInjectable, logWarningInjectable);

  return di;
};
