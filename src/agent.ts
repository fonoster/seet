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
import { Scenario, UAConfig, UAMode, Message } from "./types";
import { getRandomPort, sendRegister } from "./utils";
import { getFullTrace } from "./trace";
import logger from "@fonoster/logger";
import SIPP from "sipp-js";

let uacCounter = 0;

const uaclength = (scenario: Scenario) =>
  scenario.userAgents.filter((ua) => ua.mode === UAMode.UAC).length;

/**
 * Create a new Server or Client User Agent.
 *
 * @param {string} scenario - the scenario to be used
 * @param {UAConfig} ua - the User Agent configuration
 * @param {Function} done - callback function to be called when the UA is done
 */
export function createAgent(
  scenario: Scenario,
  ua: UAConfig,
  done: (message?: string | Error) => void
) {
  if (ua.mode === UAMode.UAC) {
    uacCounter++;
  } else {
    // Reset for every scenario
    uacCounter = 0;
  }

  if (ua.mode === UAMode.UAS && !ua.port) {
    logger.error("port is required for User Agent Server (UAS)");
    process.exit(1);
  }

  const port = ua.port ? ua.port : getRandomPort();

  if (ua.sendRegister) sendRegister(scenario, ua, port);

  const remoteHost = ua.mode === UAMode.UAC ? scenario.target : undefined;

  const sipp = new SIPP({ remoteHost, localPort: port, timeout: ua.timeout })
    .withScenario(ua.scenarioFile)
    .withTransportMode(ua.transportMode ?? scenario.transportMode);

  if (ua.authentication) {
    sipp
      .setUsername(ua.authentication.username)
      .setPassword(ua.authentication.secret);
  }

  ua.variables?.forEach((variable) => {
    sipp.setVariable(variable.name, JSON.stringify(variable.value));
  });

  if (ua.maxIterations) {
    sipp.withCallMax(ua.maxIterations);
  }

  if (ua.maxRate) {
    sipp.withCallRate(ua.maxRate);
  }

  if (ua.callLimit) {
    sipp.withCallLimit(ua.callLimit);
  }

  if (ua.mode === UAMode.UAS) {
    const timeoutTimer = setTimeout(() => {
      done(new Error("timeout"));
    }, ua.timeout);

    sipp.startAsync((error: Error) => {
      clearTimeout(timeoutTimer);

      if (error) {
        done(new Error("UAS failed. See logs for more details"));
      } else if (scenario.userAgents.length === 1) {
        // We can stop the test if the scenario only has one UAS
        done();
      }
    });
  } else {
    const result = sipp.start();
    if ("message" in result) {
      getFullTrace(ua, (result as unknown as Message).message).then((error) => {
        logger.error(JSON.stringify(error, null, 2));
        done(new Error((result as unknown as Message).message));
      });
    } else {
      if (uaclength(scenario) <= uacCounter) {
        done();
      }
    }
  }
}
