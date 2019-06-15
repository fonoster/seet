sudo sysctl -w kern.maxfiles=1048600 &&
sudo sysctl -w kern.maxfilesperproc=1048576
sudo ulimit -n 1048576
