#!/usr/bin/env sh

$(dirname "$0")/../lib/node_modules/@fonoster/seet/node_modules/mocha/bin/mocha --delay --slow 600000 --timeout 0 \
  $(dirname "$0")/../lib/node_modules/@fonoster/seet/dist/src/seet.js
