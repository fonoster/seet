# Routr [version] - [General topic. i.e: registrations] Performance Tests

Authors:
  [Author name]

<ol type="1">
    <li>Overview</li>
    <li>[General Topic] Performance Tests</li>
    <ol type="1">
        <li>[Sub-topic #1]</li>
        <li>[Sub-topic #2]</li>  
    </ol>
    <li>Conclusions</li>
    <li>Notes</li>
    <li>References</li>            
</ol>

## Overview

This benchmark measures several aspects of Routr. [Why is this test relevant].
[Explain any special conditions here. i.e., Not using authentication for the test]
[Talk or show graphical configuration of the network]

### Scope

These tests were intended to show the performances of [Scope test] implementations in Routr [version].

[Talk about the test here]

### Software

As load generator (UAC side) it was used [SIPp docker](URL) image.

[Explain the version of additional software. Include profiler and datasource]

All used SIP-related software was configured to use [TCP|UDP] as the transport protocol for SIP.

### Platform

[Explain the hardware used on the load generator and DUT]

Description of the elements used:

Equipment #1 - [Processor], [Memory] with [Operating system] testing.
Equipment #2 - [Processor], [Memory] with [Operating system] testing.
Equipment #x - [Processor], [Memory] with [Operating system] testing.

## [General Topic] Performance Tests

Routr running without any special

SIPp was used to generate [# of interaction] MESSAGE requests via Routr.
The results reflect the capacity [General or sub topic] and speed (average response time).

Flow
SIP entities definition:

UAC - [UAC]:5070
UAS - [UAS]:5070
Proxy - [PROXY_IP]:5060

SIP messages flow for one complete transaction:

```
UAC ---> MESSAGE ---> Routr ---> MESSAGE ---> UAS
UAC <--- 200 OK <---  Routr <--- 200 OK <---  UAS
```

[How many UACs were used to generate the traffic]

Configuration
SIPP command:

```bash
[Used SIPp command config ]
```

**Results**

Results reported by SIPp on the UAC servers:

| Factor | Value | Note  |
|---|---|---|
| Iterations | 200000 |   |
| Max concurrent requests | 70  |  |
| Max allowed Rate  | 10000 | requests per second  |
| Average Request Rate  | 8047.966   | requests per second  |
| Failures  | 0 |   |
| Retransmissions | 0 |   |
| Timeout  | 0 |   |
| Elapsed Time  | 00:00:24:851  | 00:00:24:851   |

<br/>
<img src="/docs/assets/images/[DUT Performance Summary]" >
<br/>
<br/>

Routr config file:

```yaml
[Whatever config applies]
```

[Graphical results]

3. Conclusions
4. Notes
5. References
