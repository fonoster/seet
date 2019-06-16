#!/usr/bin/env bash

SIPP_PORT=5080
ROUTR_HOST=192.168.1.127
SCENARIO_FILE=etc/uac_register.xml
REGISTER_FILE=etc/register.csv
REPORT_FILE=out/report.trace

docker pull ctaloi/sipp

docker run -it -p $SIPP_PORT:$SIPP_PORT/udp \
    -v $PWD:/sipp \
    ctaloi/sipp $ROUTR_HOST \
    -t u1 \
    -trace_err \
    -trace_stat \
    -trace_screen \
    -p $SIPP_PORT \
    -sf $SCENARIO_FILE \
    -inf $REGISTER_FILE \
    -r 100 \
    -m 100000 \
    -l 100 \
    -rate_increase 200 -fd 5s
    #-t tn \ if use this option the SOS begins blocking the TCP connections
