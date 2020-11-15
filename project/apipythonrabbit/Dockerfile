FROM python:3
WORKDIR /main

COPY requirements.txt .

RUN pip install requirements.txt
RUN pip install pika
COPY main/ .

EXPOSE 50051
# command to run on container start
CMD [ "python", "./server.py" ]