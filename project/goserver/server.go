package main

import (
	"context"
	"log"
	"time"
	"net"
	"google.golang.org/grpc"
	pb "google.golang.org/grpc/examples/helloworld/helloworld"
)

const (
	adress = "localhost:50051"
)

type Server struct{}

func test() {
	conn, err:= grpc.Dial(adress, grpc.WithInsecure(),grpc.WithBlock())
	if err!= nil {
		log.Fatalf("no connection: %v", err)
	}
	defer conn.Close()
	c:= pb.NewGreeterClient(conn)
	strArray := []string{"perro", "gato", "conejo"}
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	for _, animal :=range strArray{
		r, err:= c.SayHello(ctx, &pb.HelloRequest{Name: animal})
		if err != nil {
			log.Fatalf("error al enviar mensaje: %v", err)
		}
		log.Printf("Respuesta: %v", r.GetMessage())
	}
}

func main() {
	grpcServer := grpc.NewServer()
<<<<<<< HEAD

=======
>>>>>>> db7e968129ba22a4fed3d4465e85d72ea90923e0
	listen, err := net.Listen("tcp", "0.0.0.0:3000")
	if err != nil {
	  log.Fatalf("could not listen to 0.0.0.0:3000 %v", err)
	}
	log.Println("Server starting...")
	log.Fatal(grpcServer.Serve(listen))
  }
