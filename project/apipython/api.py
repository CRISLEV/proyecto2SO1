from bson import json_util
from flask import Flask, request, jsonify, Response
from flask_cors import CORS, cross_origin
from flask_pymongo import PyMongo
app = Flask(__name__)

app  = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['MONGO_URI']='mongodb://35.238.198.129:27017/Proyecto2'

mongo = PyMongo(app)

def loadBalancer(name, location, age, infectedtype, state):
    print("try loadbalancer...")
    try:
        insertInMongo(name, location, age, infectedtype, state)
        return True
    except:
        return False


def insertInMongo(name, location, age, infectedtype, state):
    print("insertando en Mongo...")
    payload = {'name': name, 'location': location, "age": age, "infectedtype":infectedtype, "state":state, "server":"python Server"}
    mongo.db.Caso.insert(payload)
    return "Mensaje insertado.\n"

def insertElementsB(user, message):
    print("insertando en B...")
    payload = {'user': user, 'textmsg': message}
    #requests.post("http://35.202.82.130:4100/insertMsg", json=payload)


# Services
@app.route('/sendMsg', methods=['POST'])
def insertMsg():
    print("Obteniendo mensaje...\n")
    req_data = request.get_json()
    print(req_data)
    name = req_data['name']
    location = req_data['location']
    age = req_data['age']
    infectedtype = req_data['infectedtype']
    state = req_data['state']
    result = loadBalancer(name, location, age, infectedtype, state)
    if (result):
        return "Mensaje enviado al server:.\n"
    else:
        return "Error al enviar mensaje.\n"

# Services
@app.route('/', methods=['GET'])
def apiserveInfo():
        return "API Python Serve V1a is Running.\n"


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=4100, debug=True)
