# SEET

SEET is an end-to-end testing tool for the SIP protocol, inspired in [pysipp](https://github.com/SIPp/pysipp).
I'm currently only covering some very basic scenarios, but I'm looking into to adding useful artifacts
to help test and troubleshoot any SIP device or software.

## Test environment

Add the following domain names to the `/etc/hosts`

`sp.lab.com:5061`

## Notes for myself

There seems to be an issue with NIOMessageProcessorFactory that creates TCP/UDP connections issues.
You will see messages like "WARN - Old socket local ip address /192.168.1.149:51842" in Routr logs

As a workaround change the message processor factory like so:

```
gov.nist.javax.sip.MESSAGE_PROCESSOR_FACTORY=gov.nist.javax.sip.stack.OIOMessageProcessorFactory
```

Another frequent issue is running multi agent scenarios, mainly due to a package lost/error.
