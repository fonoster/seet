#!/usr/bin/env sh

$(dirname "$0")/../lib/node_modules/@fonoster/seet/node_modules/mocha/bin/mocha --slow 50000 --timeout 0 \
  $(dirname "$0")/../lib/node_modules/@fonoster/seet/dist/src/seet.js