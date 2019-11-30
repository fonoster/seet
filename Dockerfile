FROM alpine
MAINTAINER Pedro Sanders <fonosterteam@fonoster.com>

RUN apk add --update sipp=3.6.0-r0 nodejs npm --repository=http://dl-cdn.alpinelinux.org/alpine/edge/main \
  && rm -rf /var/cache/apk/* /tmp/* /var/tmp/*

EXPOSE 5060/udp
EXPOSE 5060
EXPOSE 5061
EXPOSE 5062
EXPOSE 5063
