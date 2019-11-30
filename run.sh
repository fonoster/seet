#!/usr/bin/env sh

WAIT_FOR_PORT=4567
while ! nc -z $DUT_HOST $WAIT_FOR_PORT > /dev/null 2>&1; do sleep 0.1; done
npm test
