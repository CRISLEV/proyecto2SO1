package main

import (
	"bufio"
    "fmt"
	"os"
	"strings"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"bytes"

)
type Casos struct{
	Casos []Caso `json:"casos"`
}

type Caso struct {
	Name   string `json:"name"`
    Location   string `json:"location"`
    Age    int    `json:"age"`
    Infected string `json:"infectedtype"`
	State string `json:"state"`
}

func main() {
	reader := bufio.NewReader(os.Stdin)

    fmt.Println("Bienvenido al generador de trafico, seleccione una opción:")
    fmt.Println("1. Ingresar datos nuevos")
    fmt.Println("2. Utilizar datos predeterminados")
	fmt.Println("3. Salir")
	
    text, _ := reader.ReadString('\n')
	text = strings.Replace(text, "\r\n", "", -1)
	
	if strings.Compare("1", text) ==0 {
		fmt.Println("Ingrese la direccion del balanceador de carga:")
		balanceador, _ := reader.ReadString('\n')
		balanceador = strings.Replace(text, "\r\n", "", -1)
		fmt.Println(balanceador)
		fmt.Println("Ingrese la cantidad de gorutinas:")
		fmt.Println("Ingrese la cantidad de solicitudes:")
		fmt.Println("Ingrese la ruta del archivo que se desea cargar:")


	} else if strings.Compare("2",text)==0{
		server:= "https://aaddbb.free.beeceptor.com/test"
		solicitudes:= 4;
		archivo:="data.json"

		jsonFile, err := os.Open(archivo)
    	if err != nil {
        	fmt.Printf("Error leyendo archivo: %v", err)
		}
		defer jsonFile.Close()

		byteValue, _ := ioutil.ReadAll(jsonFile)

		var casos Casos
		json.Unmarshal(byteValue,&casos)
		if solicitudes < len(casos.Casos){
			fmt.Println("It is")
		}else{
			solicitudes = len(casos.Casos)
			fmt.Println("It is not")
		}
		
		for i := 0; i < solicitudes; i++ {
			fmt.Println("Name: " + casos.Casos[i].Name)
			sendata(server,casos.Casos[i])
		}
	} else{
		fmt.Println("Soy 0")

	}
	 
}

func sendata(server string,sending Caso) {
	requestBody, err := json.Marshal(sending)
	if err != nil {
		fmt.Printf("Error convirtiendo a JSON: %v", err)
	}
	resp, err := http.Post(server,"application/json",bytes.NewBuffer(requestBody))
	if err != nil {
		fmt.Printf("Error en petición post: %v", err)
	}

	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil{
		fmt.Printf("Error leyendo peticion: %v", err)
	}
	fmt.Printf(string(body))

}