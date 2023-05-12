import socket, time, os
from csv import writer
archivo = "/var/www/projectDOM/data.csv"
msgFromClient       = "MONITORIZAR"
bytesToSend         = str.encode(msgFromClient)
serverAddressPort   = ("192.168.1.40",11300)
bufferSize          = 1024
paquete=""
os.system("clear")
print('CLIENTE UDP')
#15/06/2020, 00:11:40, 47.2, 480, 65 %, 4 %
print('  Fecha      Hora     Temp  PaqR Mem Proce')

# Create a UDP socket at client side
UDPClientSocket = socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM)

def adicionar_data(datos):
    with open(archivo, 'w+') as f:
         csv_writer = writer(f, delimiter = ";")
         csv_writer.writerow(datos)



# Send to server using created UDP socket
while True:
        UDPClientSocket.sendto(bytesToSend, serverAddressPort)
        msgFromServer = UDPClientSocket.recvfrom(bufferSize)
        msg = "{}".format(msgFromServer[0])
        print(msg)
        #15/06/2020, 00:11:40, 47.2, 480, 65 %, 4 %
        #      15/06/2020;00:15:5  ;46.        ;420       ;6         ; 2 %
        i=28
        for i in range(i,len(msg)):
          if msg[i] != ",":
              paquete+=msg[i]
          if msg[i] == ",":
              a=i
              #print a
              break #a=31
        #15/06/2020, 12:34:26, 46.2, 692, 64 %, 2 %       33:35
        datos=[msg[0:10],msg[12:20],msg[22:26],paquete,msg[a+2:a+4],msg[a+8:]]
        adicionar_data(datos)
        paquete=""
#       print(msgFromServer[0])
        time.sleep(1)
