from concurrent import futures
import logging
import grpc
from main import helloworld_pb2, helloworld_pb2_grpc

from bson import json_util
import json
from flask import Flask, request, jsonify, Response
from flask_cors import CORS, cross_origin
from flask_pymongo import PyMongo

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['MONGO_URI'] = 'mongodb://35.238.198.129:27017/Proyecto2'

mongo = PyMongo(app)


class Greeter(helloworld_pb2_grpc.GreeterServicer):
    def SayHello(self, request, context):
        print('Mensaje %s' % request.name)
        req_data = request.name;
        sendMessage(req_data)

        return helloworld_pb2.HelloReply(message="Ingresando a :%s" % request.name)


def sendMessage(req_data):
    to_python = json.loads(req_data)
    print("Obteniendo mensaje...\n")
    print(to_python)
    name = to_python['name']
    location = to_python['location']
    age = to_python['age']
    infectedtype = to_python['infectedtype']
    state = to_python['state']
    print("nombre:" + name)
    result = loadBalancer(name, location, age, infectedtype, state)
    if (result):
        return "Mensaje enviado al server:.\n"
    else:
        return "Error al enviar mensaje.\n"


def loadBalancer(name, location, age, infectedtype, state):
    print("try loadbalancer...")
    try:
        insertInMongo(name, location, age, infectedtype, state)
        return True
    except:
        return False


def insertInMongo(name, location, age, infectedtype, state):
    print("insertando en Mongo...")
    payload = {'name': name, 'location': location, "age": age, "infectedtype": infectedtype, "state": state,
               "server": "python Server"}
    mongo.db.Caso.insert(payload)
    return "Mensaje insertado.\n"


def server():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    helloworld_pb2_grpc.add_GreeterServicer_to_server(Greeter(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()


if __name__ == '__main__':
    logging.basicConfig()
    server()
