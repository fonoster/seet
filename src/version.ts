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
import { exec } from "child_process";
import util from "util";
import semver from "semver";

const execAsync = util.promisify(exec);

/**
 * Checks if the installed version of sipp satisfies the given range.
 * @param {string} versionRange - The range to check against
 * @return {object} An object with the result of the check and the version
 * @throws If the version cannot be determined
 */
export async function checkSippVersion(versionRange: string) {
  let versionOutput;
  try {
    const result = await execAsync("sipp -v");
    versionOutput = result.stdout;
  } catch (error) {
    // If there's an error but stdout is available, use it
    if (error.stdout) {
      versionOutput = error.stdout;
    } else {
      throw error;
    }
  }

  const versionMatch = versionOutput.match(/SIPp v([\d.]+)/);
  if (versionMatch && versionMatch[1]) {
    const version = versionMatch[1];

    // Check if the version satisfies the given range
    if (semver.satisfies(version, versionRange)) {
      return { isValid: true, version };
    } else {
      return { isValid: false, version };
    }
  } else {
    throw new Error("could not determine sipp version.");
  }
}
