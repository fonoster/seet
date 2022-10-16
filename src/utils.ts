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
import { RegisterRequest, Scenario, UAConfig } from "./types";
import SIPP from "sipp-js";

const register = (req: RegisterRequest) => {
  new SIPP({ remoteHost: req.registrarAddr, localPort: req.port })
    .withScenario(`${__dirname}/../../scenarios/registration.xml`)
    .setUsername(req.username)
    .setPassword(req.secret)
    .setVariable("username", req.username)
    .setVariable("domain", req.domain)
    .setVariable("expires", `${req.expires}`)
    .withTransportMode(req.transportMode)
    .start();
};

/**
 * Send a SIP registration request to a given user agent
 *
 * @param {string} scenario - the scenario to be used
 * @param {UAConfig} ua - the User Agent configuration
 * @param {number} port - the port to listen for incoming requests
 */
export function sendRegister(scenario: Scenario, ua: UAConfig, port: number) {
  register({
    registrarAddr: scenario.target,
    port,
    domain: scenario.domain || scenario.target.split(":")[0],
    username: ua.authentication?.username,
    secret: ua.authentication.secret,
    expires: ua.expires,
    transportMode: ua.transportMode || scenario.transportMode,
  });
}

export const getRandomPort = () =>
  Math.floor(Math.random() * (6000 - 5060)) + 5060;
