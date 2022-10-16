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
import logger from "@fonoster/logger";
import { Scenario } from "./types";

// TODO: We must validate the scenario before running it
export const getConfig = (envname: string): Scenario[] => {
  if (!process.env[envname]) {
    logger.error(
      `the environment variable ${envname} is required but was not found`
    );
  }

  try {
    return require(process.env[envname]);
  } catch (e) {
    logger.error(
      `the configuration file is invalid or doesn't exist: file => ${process.env[envname]}`
    );
    process.exit(1);
  }
};
