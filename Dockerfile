##
## Build
##
FROM node:22-alpine AS builder
LABEL Pedro Sanders <psanders@fonoster.com>

COPY . /build
WORKDIR /build

RUN npm install && npm run build && npm pack

##
## Runner
##
FROM node:22-alpine AS runner

ARG SCENARIOS=/seet.json
ENV SCENARIOS=${SCENARIOS}

COPY --from=builder /build/fonoster-seet-* ./

# SIPp comes from the distro; the version range SEET accepts is in src/seet.ts.
# --ignore-scripts: a global install on Linux still tries to compile fsevents, a
# macOS-only optional module behind mocha, and fails without a toolchain. Nothing
# SEET depends on needs an install script, so skip them all and keep the image free
# of python3, make and g++.
RUN apk add --no-cache sipp=3.7.7-r0 \
  && npm install --location=global --ignore-scripts fonoster-seet-*.tgz \
  && rm -f fonoster-seet-*.tgz

ENTRYPOINT ["sh", "-c"]
CMD [ "seet" ]
