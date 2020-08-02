FROM alpine:3.11
MAINTAINER Pedro Sanders <fonosterteam@fonoster.com>

COPY . tester
WORKDIR tester

RUN apk add --update sipp=3.6.0-r0 nodejs=12.15.0-r1 npm=12.15.0-r1 \
  && npm install -f \
  && rm -rf /var/cache/apk/* /tmp/* /var/tmp/*

EXPOSE 5061
EXPOSE 5062

ENTRYPOINT ["sh", "-c", "/tester/run.sh"]
