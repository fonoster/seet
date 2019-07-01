## Known issues

`startAsync` is not stopping and removing docker images. Use the following
commands to stop and remove unused containers.

```bash
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
```
