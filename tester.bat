@echo off
setlocal

set SIPP_PORT=5080
set ROUTR_HOST=192.168.1.127
set SCENARIO_FILE=etc/uac_register.xml
set REGISTER_FILE=etc/register.csv
set REPORT_FILE=out/report.trace
set BASE_DIR=%~dp0

docker pull ctaloi/sipp

docker run -it -p %SIPP_PORT%:%SIPP_PORT%/udp -v %BASE_DIR%:/sipp ctaloi/sipp %ROUTR_HOST% -t t1 -trace_screen -trace_err -trace_stat -p %SIPP_PORT% -sf %SCENARIO_FILE% -inf %REGISTER_FILE% -r 100 -m 100000 -l 100 -rate_increase 200 -fd 5s
