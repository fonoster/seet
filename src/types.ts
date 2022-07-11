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
import { TransportMode } from "sipp-js";

export enum UACMode {
  UAC = "uac",
  UAS = "uas",
}

export interface UA {
  mode: UACMode;
  port?: number;
  scenarioFile: string;
  authentication?: {
    username: string;
    secret: string;
  };
  sendRegister: boolean;
  expires: number;
  transportMode: TransportMode;
  variables?: { name: string; value: string }[];
  timeout?: number;
}

export interface Scenario {
  name: string;
  description: string;
  userAgents: UA[];
  // externalHost: string;
  externalPort: number;
  target: string;
  domain?: string;
  transportMode: TransportMode;
  options: {
    maxIterations?: number;
    maxRate?: number;
    callLimit?: number;
    rateIncrease?: number;
    rateIncreaseTime?: number;
  };
  enabled: boolean;
}

export interface RegisterRequest {
  registrarAddr: string;
  port: number;
  domain: string;
  username: string;
  secret: string;
  expires: number;
  transportMode: TransportMode;
}
