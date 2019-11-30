FROM alpine
MAINTAINER Pedro Sanders <fonosterteam@fonoster.com>

COPY . tester
WORKDIR tester

RUN apk add --update sipp=3.6.0-r0 nodejs npm --repository=http://dl-cdn.alpinelinux.org/alpine/edge/main \
  && npm install -f \
  && rm -rf /var/cache/apk/* /tmp/* /var/tmp/*

EXPOSE 5061
EXPOSE 5062

ENTRYPOINT ["sh", "-c", "/tester/run.sh"]
