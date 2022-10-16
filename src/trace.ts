/*
 * Copyright (C) 2022 by Fonoster Inc (https://fonoster.com)
 * http://github.com/fonoster
 *
 * This file is part of SEET
 *
 * Licensed under the MIT License (the "License");
 * you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 *    https://opensource.org/licenses/MIT
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { UAConfig, UAError } from "./types";
import glob from "glob";
import fs from "fs";

export const getFullTrace = (
  ua: UAConfig,
  message: string
): Promise<UAError> => {
  const arr = ua.scenarioFile.split("/");
  const baseName = arr[arr.length - 1].split(".xml")[0];

  return new Promise((resolve) => {
    glob(`${baseName}_*.log`, function (error: Error, files: string[]) {
      let errors = "";
      files.forEach((file: string) => {
        errors += fs.readFileSync(file);
      });

      resolve({
        command: message.includes("Command failed:")
          ? message.split("Command failed:")[1].trim()
          : message,
        error: errors,
      });
    });
  });
};
