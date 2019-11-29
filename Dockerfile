FROM alpine
MAINTAINER Pedro Sanders <fonosterteam@fonoster.com>

RUN apk add --update sipp nodejs npm \
  && rm -rf /var/cache/apk/* /tmp/* /var/tmp/*

EXPOSE 5060/udp
EXPOSE 5060
EXPOSE 5061
EXPOSE 5062
EXPOSE 5063
