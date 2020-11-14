package main

import (
	"context"
	"log"
	"time"
	"google.golang.org/grpc"
	pb "google.golang.org/grpc/examples/helloworld/helloworld"
)

const{
	adress = "localhost:50051"
}

func main() {
	conn, err:= grpc.Dial(adress, grpc.WithInsecure(),grpc.WithBlock())
	if err!= nil {
		log.Fatalf("no connection: %v" err)
	}
	defer conn.Close()
	c:= pb.NewGreeterClient(conn)
	strArray := []string{"perro", "gato", "conejo"}
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	for _, animal :=range strArray{
		r, err:= c.sendMsg(ctx, &pb.HelloRequest{Name: animal})
		if err != nil {
			log.Fatalf("error al enviar mensaje: %v", err)
		}
		log.Printf("Respuesta: %v", r.GetMessage())
	}
}