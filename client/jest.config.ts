import type { Config } from "@jest/types";
import path from "path";

const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(png|jpg|jpeg|gif|svg|ico)$": path.join(__dirname, "image-mock.js"),
  },
};
export default config;
