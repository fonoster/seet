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
import { createAgent } from "./agent";
import { getConfig } from "./config";
import { Scenario, UAMode } from "./types";
import { checkSippVersion } from "./version";

const versionRange = ">=3.6.0 <3.6.1";

checkSippVersion(versionRange)
  .then((result: { isValid: boolean; version: string }) => {
    if (result.isValid) {
      const scenarios: Scenario[] = getConfig("SCENARIOS");

      describe(`SEET Test Plan / ${scenarios.length} scenario(s) found`, () => {
        scenarios.forEach(function (scenario) {
          (scenario.only
            ? it.only
            : scenario.enabled === undefined || scenario.enabled
            ? it
            : it.skip)(scenario.name, (done) => {
            // We start all the User Agent Servers (UAS) first
            scenario.userAgents
              .filter((userAgent) => userAgent.mode === UAMode.UAS)
              .forEach((userAgent) => {
                userAgent.timeout = userAgent.timeout
                  ? userAgent.timeout * 1000
                  : 30000;
                createAgent(scenario, userAgent, done);
              });

            // Then, we start all the User Agent Clients (UAC)
            setTimeout(() => {
              scenario.userAgents
                .filter((userAgent) => userAgent.mode === UAMode.UAC)
                .forEach((userAgent) => createAgent(scenario, userAgent, done));
            }, 3000);
          });
        });
      });
    } else {
      console.log(
        `sipp version ${result.version} is not within the valid range: ${versionRange}`
      );
    }
  })
  .catch((error: Error) => {
    console.error(error.message);
  });
