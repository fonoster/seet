sudo sysctl -w net.inet.tcp.rfc1323=1
sudo sysctl -w net.inet.tcp.win_scale_factor=4
sudo sysctl -w net.inet.tcp.sendspace=1042560
sudo sysctl -w net.inet.tcp.recvspace=1042560
sudo sysctl -w net.inet.tcp.mssdflt=1448
sudo sysctl -w net.inet.tcp.v6mssdflt=1412
sudo sysctl -w net.inet.tcp.msl=15000
sudo sysctl -w net.inet.tcp.always_keepalive=0
sudo sysctl -w net.inet.tcp.delayed_ack=3
sudo sysctl -w net.inet.tcp.slowstart_flightsize=20
sudo sysctl -w net.inet.tcp.local_slowstart_flightsize=9
sudo sysctl -w net.inet.tcp.blackhole=2
sudo sysctl -w net.inet.udp.blackhole=1
sudo sysctl -w net.inet.icmp.icmplim=50

sudo sysctl -w kern.maxfiles=1048600 &&
sudo sysctl -w kern.maxfilesperproc=1048576
sudo ulimit -n 1048576
