package main

import (
    "fmt"
    "net/http"
    "context"
	"log"
	"time"
    "io/ioutil"
    "google.golang.org/grpc"
	pb "google.golang.org/grpc/examples/helloworld/helloworld"
)

type caso struct {
    name         string `json:"name"`
    location     string `json:"location"`
    age          int    `json:"age"`
    infectedtype string `json:"infectedtype"`
    state        string `json:"state"`
}

const (
	address = "localhost:50051"
)

func main() {

    http.HandleFunc("/sendMsg", func(w http.ResponseWriter, req *http.Request) {
        log.Printf("hello\n")
        body, err := ioutil.ReadAll(req.Body)
        if err != nil {
            print(err)
        }
        fmt.Println(string(body))
        SendToPython(string(body))
    })

    direccion := ":8090"
    fmt.Println("Servidor GO listo escuchando en " + direccion)
    log.Fatal(http.ListenAndServe(direccion, nil))
}

func SendToPython (body string) {
    log.Printf(body)
	conn, err:= grpc.Dial(address, grpc.WithInsecure(),grpc.WithBlock())
	if err!= nil {
		log.Fatalf("no connection: %v", err)
	}
	defer conn.Close()
	c:= pb.NewGreeterClient(conn)
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
    
    r, err:= c.SayHello(ctx, &pb.HelloRequest{Name: body})
    if err != nil {
        log.Fatalf("error al enviar mensaje: %v", err)
    }
    log.Printf("Respuesta: %v", r.GetMessage())
}