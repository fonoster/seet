# SIP End-to-End Testing

[![publish to docker hub](https://github.com/fonoster/seet/actions/workflows/gh-docker.yml/badge.svg)](https://github.com/fonoster/seet/actions/workflows/gh-docker.yml)

<img src="test_example.png" />

SEET is a suite for end-to-end testing of SIP deployments. We aim to add useful artifacts to help test and troubleshoot any SIP device or software. SEET is inspired in [pysipp](https://github.com/SIPp/pysipp).

It lets you run complex scenarios involving multiple UASs and UACs. With SEET, you create your SIPp XML scenarios as usual and the suite creates the necesary User Agents and ensure the scenarios run in the correct sequence.

## Scenario configuration

| Property                                | Description                                                       | Required |
| --------------------------------------- | ----------------------------------------------------------------- | -------- |
| name                                    | The name of the scenario                                          | Yes      |
| description                             | The description of the scenario                                   | No       |
| target                                  | System under test                                                 | No       |
| transportMode                           | SIPp transport mode. Check [here](https://github.com/SIPp/sipp/blob/v3.6.1/docs/transport.rst) for possible values               | Yes      |
| domain                                  | Needed for registration. Defaults to `target`                     | No       |
| enabled                                 | Enables scenario. Defauls to `true`                               | No       |
| only                                    | Exclude all other scenarios. Defauls to `false`                   | No       |
| userAgents.[*].mode                     | User Agent mode. Possible values are `uac` and `uas`              | Yes      |
| userAgents.[*].scenarioFile             | Path to the SIPp XML scenario                                     | Yes      |
| userAgents.[*].authentication           | Username and password for SIP authentication                      | No       |
| userAgents.[*].sendRegister             | Used for User Agent registration                                  | No       |
| userAgents.[*].sessionCount             | Optional Session Count sent during registration. Defaults to `0`  | No       |
| userAgents.[*].expires                  | Expiration in seconds use in for `sendRegister`. Defaults to `30` | No       |
| userAgents.[*].timeout                  | Maximum duration in seconds for the scenario                      | No       |
| userAgents.[*].variables                | Key-value array for SIPp XML scenario                             | No       |
| options.maxIterations                   | Reserved                                                          | No       |
| options.maxRate                         | Reserved                                                          | No       |
| options.callLimit                       | Reserved                                                          | No       |
| options.rateIncrease                    | Reserved                                                          | No       |
| options.rateIncreaseTime                | Reserved                                                          | No       |

**Example of scenario file**

```json
[
  {
    "name": "Simple SIP Message",
    "description": "UAC sends a simple MESSAGE to UAS and waits for an OK response",
    "target": "192.168.1.3",
    "transportMode": "u1",
    "domain": "sip.local",
    "userAgents": [
      {
        "mode": "uas",
        "scenarioFile": "scenarios/ims_uas.xml",
        "authentication": {
          "username": "1001",
          "secret": "1234"
        },
        "sendRegister": true,
        "expires": 30
      },
      {
        "mode": "uac",
        "scenarioFile": "scenarios/ims_uac.xml",
        "authentication": {
          "username": "1002",
          "secret": "1234"
        },
        "variables": [
          {
            "name": "requestURI",
            "value": "1001@sip.local"
          },
          {
            "name": "from",
            "value": "1002@sip.local"
          },
          {
            "name": "to",
            "value": "1001@sip.local"
          }
        ]
      }
    ],
    "enabled": true
  }
]
```

## Available Versions

You can see all images available to pull from Docker Hub via the [Tags](https://hub.docker.com/repository/docker/fonoster/seet) page. Docker tag names that begin with a "change type" word, such as task, bug, or feature, are available for testing and may be removed at any time.

## Installation

You can clone this repository and manually build it.

```
git clone https://github.com/fonoster/seet
cd seet
docker build -t fonoster/seet:%%VERSION%% .
```

Otherwise, you can pull this image from the docker index.

```
docker pull fonoster/seet:%%VERSION%%
```

## Usage Example

The following is a basic example of using this image. Be sure to add the port of every User Agent Server. If you use an udp mode in your scenario (e.g. `u1`), you must also bind the port in docker with the corresponding notation.

```
docker run \
  -v $(pwd)/seet.json:/seet.json \
  -v $(pwd)/scenarios:/scenarios \
  -p 7060:7060/udp \
  -t fonoster/seet 
```

or with NodeJS

```
# Requires of sipp 3.6.0-r2 installed in the host
npm i -g @fonoster/seet
SCENARIOS=$(pwd)/seet_example.json seet
```

## Environment Variables

Environment variables are used in the entry point script to render configuration templates. You can specify the values of these variables during `docker run`, `docker-compose up`, or in Kubernetes manifests in the `env` array.

- `SCENARIOS` - Changes the default path to the scenario file.

## Exposed ports

None

## Volumes

- `/scenarios` - Location for your SIPp `XML` files
- `/seet.json` - Default location for your scenarios file

## Contributing

Please read [CONTRIBUTING.md](https://github.com/fonoster/fonoster/blob/master/CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests to us.

## Authors

- [Pedro Sanders](https://github.com/psanders)

See this project's list of contributors who [participated](https://github.com/fonoster/seet/contributors).

## License

Copyright (C) 2023 by Fonoster Inc. MIT License (see [LICENSE](https://github.com/fonoster/fonoster/blob/master/LICENSE) for details).
