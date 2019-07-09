## Known issues

There seems to be an issue with NIOMessageProcessorFactory that creates TCP/UDP connections issues.
You will see messages like "WARN - Old socket local ip address /192.168.1.149:51842" in Routr logs

As a workaround change the message processor factory like so:

```
gov.nist.javax.sip.MESSAGE_PROCESSOR_FACTORY=gov.nist.javax.sip.stack.OIOMessageProcessorFactory
```
