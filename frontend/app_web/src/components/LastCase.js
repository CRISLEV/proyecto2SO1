import React, { Component } from 'react';


var setUrl="";



class LastCase extends Component {
    constructor (props) {
      super(props)
      this.state = {
  
        datos:[]


      }
 
  
      setUrl ='http://localhost:2000/getlast';
      console.log("GetLast")
      fetch(setUrl)
      .then(res => res.json())
      .then((data) => {
        this.setState({ datos: data.data})
        console.log(this.state.datos)

      })
      .catch(console.log)
 
    }
  
  

    render() {

      const todos = this.state.datos.map((todo, i) => {
        return (

                  <tbody>
                  <tr className="table-warning">
                  <th scope="row">Nombre </th>
                  <td>{todo.name}  </td>
                  </tr>
                  <tr className="table-warning">
                  <th scope="row">Ubicación </th>
                  <td>{todo.location}  </td>
                  </tr>
                  <tr className="table-warning">
                  <th scope="row">Edad </th>
                  <td>{todo.age}  </td>
                  </tr>
                  <tr className="table-warning">
                  <th scope="row">Infección </th>
                  <td>{todo.infectedtype}  </td>
                  </tr>
                  <tr className="table-warning">
                  <th scope="row">Estado </th>
                  <td>{todo.state}  </td>
                  </tr>                                                        
                  </tbody>

        )
      });
        return (
          <div className="App">
    

    
    
    
    
                  <div className="row">
                  <div className="col-md-12" >               
                       <div className="card mt-4" >
                       <div class="card-header">Ultimo caso agregado</div>
                         <div className="card-body">
                         <table class="table table-hover">
                           {todos}
                        </table>
                       </div>
                    </div>
            
    
                </div>
                </div>
    
    
          </div>
        );
      }
    
    
      
    }

export default LastCase;
