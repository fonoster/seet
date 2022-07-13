##
## Build
##
FROM node:lts-alpine as builder
LABEL Pedro Sanders <psanders@fonoster.com>

COPY . /build
WORKDIR /build

RUN npm install --location=global npm@8.13.2 && npm install
RUN npm run build
RUN npm pack

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
