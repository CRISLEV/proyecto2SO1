import React, { Component } from 'react';
import Plot from 'react-plotly.js';

var setUrl="";




class GraphPie extends Component {
    constructor (props) {
      super(props)
      this.state = {
  
        datos:[]


      }
 
  
      setUrl ='http://localhost:2000/getpiedata';
      console.log("InformacionPie")
      fetch(setUrl)
      .then(res => res.json())
      .then((data) => {
        this.setState({ datos: data.data})
        console.log(this.state.datos)

      })
      .catch(console.log)
 
    }
  
  


    render () {
      const lugar = this.state.datos.map((dato)=>dato._id);
      const cantidad = this.state.datos.map((dato)=>dato.total)
      return (
        <div className="jumbotron">
          <h1>Casos por departamento </h1>
          <Plot
          data={[
            {
              values: cantidad,
              labels: lugar,
              type: 'pie'
            }
          ]}
          layout={ {width: 800, height: 440} }
         />
        </div>
      )
    }

  }

export default GraphPie;
