#!/usr/bin/env sh

$(dirname "$0")/../lib/node_modules/scaiptester/node_modules/mocha/bin/mocha --timeout 0 \
  $(dirname "$0")/../lib/node_modules/scaiptester/dist/src/seet.js