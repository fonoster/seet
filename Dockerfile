FROM alpine:3.11
LABEL Pedro Sanders <fonosterteam@fonoster.com>

COPY . /tester
WORKDIR /tester

RUN apk add --update sipp=3.6.0-r0 nodejs npm \
  && npm install -f \
  && rm -rf /var/cache/apk/* /tmp/* /var/tmp/*

EXPOSE 5061
EXPOSE 5062

ENTRYPOINT ["sh", "-c", "/tester/run.sh"]
