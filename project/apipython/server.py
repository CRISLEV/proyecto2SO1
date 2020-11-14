from concurrent import futures
import logging
import grpc
import helloworld_pb2
import helloworld_pb2_grpc

class Greeter(helloworld_pb2_grpc.GreeterServicer):
    def saveCase(self,request,context):
        print('Mensaje %s'% request.name)
        return helloworld_pb2.HelloReply(message = "Ingresando a :%s"%request.name)

def server():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    helloworld_pb2_grpc.add_GreeterServicer_to_server(Greeter(),server)
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()

if __name__ == '__main__':
    logging.basicConfig()
    server()
