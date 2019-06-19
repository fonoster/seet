#!/usr/bin/env bash

set -e

mkdir -p out

SIPP_PORT=5081
ROUTR_HOST=192.168.1.137    # This should be a parameter
SCENARIO_FILE=etc/scenarios/uac_register_guest.xml
REGISTER_FILE=etc/scenarios/register_guest.csv
STATS_FILE=out/stats_report.csv

# Check if image is availble
docker pull ctaloi/sipp

docker run -it -p $SIPP_PORT:$SIPP_PORT/udp \
    -v $PWD:/sipp \
    ctaloi/sipp $ROUTR_HOST \
    -t t1 \
    -trace_stat \
    -trace_screen \
    -p $SIPP_PORT \
    -sf $SCENARIO_FILE \
    -stf $STATS_FILE \
    -inf $REGISTER_FILE \
    -r 4000 \
    -l 100 \
    -m 10000

# Move screen report to out folder

mv etc/scenarios/*.log out
