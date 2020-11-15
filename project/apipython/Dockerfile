FROM python:3
WORKDIR /main

COPY requirements.txt .

RUN pip install -r requirements.txt
RUN pip install grpcio
RUN pip install grpcio-tools

COPY main/ .

EXPOSE 50051
# command to run on container start
CMD [ "python", "./server.py" ]