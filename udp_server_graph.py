import socket, os,time
localIP     = "192.168.1.40"
localPort   = 11300
bufferSize  = 1024
msgFromServer       = "CLIENTE UDP"
bytesToSend         = str.encode(msgFromServer)
devname = "enp0s3"
timestep = 1 # Seconds
os.system("clear")
#print (str(TEMPE))
UDPServerSocket = socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM)
UDPServerSocket.bind((localIP, localPort))
print("UDP SERVIDOR Y ESCUCHANDO")

def transmissionrate(dev, direction, timestep):
    path = "/sys/class/net/{}/statistics/{}_bytes".format(dev, direction)
    f = open(path, "r")
    bytes_before = int(f.read())
    f.close()
    time.sleep(timestep)
    f = open(path, "r")
    bytes_after = int(f.read())
    f.close()
    return (bytes_after-bytes_before)/timestep

# Listen for incoming datagrams
while True:
    bytesAddressPair = UDPServerSocket.recvfrom(bufferSize)
    message = bytesAddressPair[0]
    message = message.decode()
    address = bytesAddressPair[1]
    clientMsg = "MENSAJE DEL CLIENTE:{}".format(message)
    #clientIP  = "DIRECCION IP DEL CLIENTE:{}".format(address)
    print(clientMsg)
    #print(clientIP)
    if message == "MONITORIZAR":
        TEMPE=os.popen('vcgencmd measure_temp').read()
        fecha=os.popen('date +\'%d/%m/%Y %H:%M:%S\'').read()
        dato_eth0_rx=transmissionrate(devname, "rx", timestep)
        #hdisk_Total=os.popen('df -h | sed \'2!d\' | awk \'{print $2}\'').read()
        #hdisk_Usado=os.popen('df -h | sed \'2!d\' | awk \'{print $3}\'').read()
        #hdisk_libre=os.popen('df -h | sed \'2!d\' | awk \'{print $4}\'').read()
        mem_dispo=os.popen('free -h |sed \'2!d\'| awk \'{print ($7*100/$2\" %\")}\'').read()
        cpu_dispo=os.popen('sudo python /home/pi/read_cpu.py').read()
        msgFromServer = fecha[0:10]+", "+fecha[11:19]+", "+TEMPE[5:9] + ", "+str(dato_eth0_rx)+\
                        ", "+mem_dispo[0:2]+" %, "+str(cpu_dispo.rstrip('\n'))
        bytesToSend = str.encode(msgFromServer)
        #print(TEMPE)
        UDPServerSocket.sendto(bytesToSend, address)
    # Sending a reply to client
