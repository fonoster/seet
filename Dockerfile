##
## Build
##
FROM node:16.15.1-alpine3.15 as builder
LABEL Pedro Sanders <psanders@fonoster.com>

COPY . /build
WORKDIR /build

RUN npm install && npm run build && npm pack

##
## Runner
##
FROM node:16.15.1-alpine3.15 as runner

ARG SCENARIOS=/seet.json
ENV SCENARIOS=${SCENARIOS}

COPY --from=builder /build/fonoster-seet-* ./

RUN apk add --update sipp=3.6.0-r2 \
  && npm install --location=global fonoster-seet-*.tgz \
  && rm -f fonoster-seet-*.tgz

ENTRYPOINT ["sh", "-c"]
CMD [ "seet" ]
