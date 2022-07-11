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
import { createAgent, getConfig } from "./utils";
import { Scenario, UA, UACMode } from "./types";

const scenarios: Scenario[] = getConfig("SCENARIOS");

describe(`SEET Test Plan / ${scenarios.length} scenario(s) found`, () => {
  scenarios.forEach((s) => {
    it[s.enabled ? "only" : "skip"](s.name, (done) => {
      // We start all the UAS first
      s.userAgents
        .filter((ua: UA) => ua.mode === UACMode.UAS)
        .forEach((ua: UA) => {
          ua.timeout = ua.timeout ? ua.timeout * 1000 : 30000;
          createAgent(s, ua, done);
        });

      // Run remaining agents after a timeout
      setTimeout(() => {
        s.userAgents
          .filter((ua: UA) => ua.mode === UACMode.UAC)
          .forEach((ua) => createAgent(s, ua));
      }, 3000);
    });
  });
});
