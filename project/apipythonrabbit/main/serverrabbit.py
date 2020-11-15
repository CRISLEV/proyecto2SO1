import pika

connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
channel = connection.channel()

channel.queue_declare(queue='hello')

def callback(ch,nethod, properties, body):
    print("Recibido %r" % body)

channel.basic_consume(queue='hello',on_message_callback=callback, auto_ack=True)
print('Esperando por Mensajes')
channel.start_consuming()