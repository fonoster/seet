##
## Build
##
FROM node:lts-alpine as builder
LABEL Pedro Sanders <psanders@fonoster.com>

COPY . /app
WORKDIR /app

RUN npm install && npm run build && npm pack

##
## Runner
##
FROM node:lts-alpine as runner

ARG SCENARIOS=/seet.json
ENV SCENARIOS=${SCENARIOS}
COPY --from=builder /build/fonoster-seet-* ./
RUN apk add --update sipp=3.6.0-r2 \
  && npm install -g fonoster-seet-*.tgz \
  && rm -f fonoster-seet-*.tgz

ENTRYPOINT ["sh", "-c"]
CMD [ "seet" ]
