import React, { Component } from 'react';
import Plot from 'react-plotly.js';

var setUrl="";


class GraphBars extends Component {
  constructor (props) {
    super(props)
    this.state = {

      datos:[]


    }


    setUrl ='http://localhost:2000/getbarrasdata';
    console.log("informationBars")
    fetch(setUrl)
    .then(res => res.json())
    .then((data) => {
      this.setState({ datos: data.data})
      console.log(this.state.datos)

    })
    .catch(console.log)
    }
  
    getedad1(edad)
    {
      if (edad<=10){
        console.log("edad 0-10")
        console.log(edad)
        return edad
      }
    }
    getedad2(edad)
    {
      if (edad<=20 && edad>10){
        console.log("edad 11-20")
        console.log(edad)
        return edad
      }
    }

    getedad3(edad)
    {
      if (edad<=30 && edad>20){
        console.log("edad 21-30")
        console.log(edad)
        return edad
      }
    }
    getedad4(edad)
    {
      if (edad<=40 && edad>30){
        console.log("edad 31-40")
        console.log(edad)
        return edad
      }
    }
    getedad5(edad)
    {
      if (edad<=50 && edad>40){
        console.log("edad 41-50")
        console.log(edad)
        return edad
      }
    }

    getedad6(edad)
    {
      if (edad<=60 && edad>50){
        console.log("edad 51-60")
        console.log(edad)
        return edad
      }
    }

    getedad7(edad)
    {
      if (edad<=70 && edad>60){
        console.log("edad 61-70")
        console.log(edad)
        return edad
      }
    }

    getedad8(edad)
    {
      if (edad<=80 && edad>70){
        console.log("edad 71-80")
        console.log(edad)
        return edad
      }
    }
    getedad9(edad)
    {
      if (edad<=90 && edad>80){
        console.log("edad 81-90")
        console.log(edad)
        return edad
      }
    }
    getedad10(edad)
    {
      if (edad>90){
        console.log("edad < 90")
        console.log(edad)
        return edad
      }
    }
    
    render () {
      const edad1 = this.state.datos.map((dato)=>{ return(this.getedad1(dato._id))});
      const cantidad1 = this.state.datos.map((dato)=>{ return(this.getedad1(dato.total))});
      const edad2 = this.state.datos.map((dato)=>{ return(this.getedad2(dato._id))});
      const cantidad2 = this.state.datos.map((dato)=>{ return(this.getedad2(dato.total))});
      const edad3 = this.state.datos.map((dato)=>{ return(this.getedad3(dato._id))});
      const cantidad3 = this.state.datos.map((dato)=>{ return(this.getedad3(dato.total))});
      const edad4 = this.state.datos.map((dato)=>{ return(this.getedad4(dato._id))});
      const cantidad4 = this.state.datos.map((dato)=>{ return(this.getedad4(dato.total))});
      const edad5 = this.state.datos.map((dato)=>{ return(this.getedad5(dato._id))});
      const cantidad5 = this.state.datos.map((dato)=>{ return(this.getedad5(dato.total))});
      const edad6 = this.state.datos.map((dato)=>{ return(this.getedad6(dato._id))});
      const cantidad6 = this.state.datos.map((dato)=>{ return(this.getedad6(dato.total))});
      const edad7 = this.state.datos.map((dato)=>{ return(this.getedad7(dato._id))});
      const cantidad7 = this.state.datos.map((dato)=>{ return(this.getedad7(dato.total))});
      const edad8 = this.state.datos.map((dato)=>{ return(this.getedad8(dato._id))});
      const cantidad8 = this.state.datos.map((dato)=>{ return(this.getedad8(dato.total))});
      const edad9 = this.state.datos.map((dato)=>{ return(this.getedad9(dato._id))});
      const cantidad9 = this.state.datos.map((dato)=>{ return(this.getedad9(dato.total))});
      const edad10 = this.state.datos.map((dato)=>{ return(this.getedad10(dato._id))});
      const cantidad10 = this.state.datos.map((dato)=>{ return(this.getedad10(dato.total))});
      return (
        <div className="jumbotron">
          <h1>Edades afectadas </h1>
          <Plot
          data={[
            
              
              {
                y: edad1,
                x: cantidad1,
                name: "edad 0-10",
                type: 'bar',
                orientation: 'h'
              },
              
              {
                y: edad2,
                X: cantidad2,
                name: "edad 11-20",
                type: 'bar',
                orientation: 'h'
              },
              {
                y: edad3,
                X: cantidad3,
                name: "edad 21-30",
                type: 'bar',
                orientation: 'h'
              },
              {
                y: edad4,
                X: cantidad4,
                name: "edad 31-40",
                type: 'bar',
                orientation: 'h'
              },
              {
                y: edad5,
                X: cantidad5,
                name: "edad 41-50",
                type: 'bar',
                orientation: 'h'
              },
              {
                y: edad6,
                X: cantidad6,
                name: "edad 51-60",
                type: 'bar',
                orientation: 'h'
              },
              {
                y: edad7,
                X: cantidad7,
                name: "edad 61-70",
                type: 'bar',
                orientation: 'h'
              },
              {
                y: edad8,
                X: cantidad8,
                name: "edad 71-80",
                type: 'bar',
                orientation: 'h'
              },
              {
                y: edad9,
                X: cantidad9,
                name: "edad 81-90",
                type: 'bar',
                orientation: 'h'
              },
              {
                y: edad10,
                X: cantidad10,
                name: "edad < 90",
                type: 'bar',
                orientation: 'h'
              }
            
          ]}
          layout={ {width: 800, height: 440} }
         />
        </div>
      )
    }

  }

export default GraphBars;
