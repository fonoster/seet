# Routr EET

[![Build Status](https://github.com/fonoster/routr-eet/workflows/build/badge.svg)](https://github.com/fonoster/routr-eet/actions?workflow=build)

Routr EET is a suite for end-to-end testing of Routr Server. It is inspired in [pysipp](https://github.com/SIPp/pysipp).
We are currently only covering some very basic scenarios, but we are looking into to adding useful artifacts
to help test and troubleshoot any SIP device or software.

## Test environment

Add the following domain names to the `/etc/hosts`

`sp.provider.com`

## Notes for the developers

There seems to be an issue with NIOMessageProcessorFactory that creates TCP/UDP connections issues.
You will see messages like "WARN - Old socket local ip address /192.168.1.149:51842" in Routr logs

As a workaround change the message processor factory like so:

```
gov.nist.javax.sip.MESSAGE_PROCESSOR_FACTORY=gov.nist.javax.sip.stack.OIOMessageProcessorFactory
```

Another frequent issue is running multi agent scenarios, mainly due to a package lost/error.
