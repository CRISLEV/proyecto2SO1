import React, { Component } from 'react';


var setUrl="";



class TopCasos extends Component {
    constructor (props) {
      super(props)
      this.state = {
  
        datos:[]


      }
 
  
      setUrl ='http://localhost:2000/getTop';
      console.log("InformacionPie")
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

                    <tr className="table-danger">
                      <th scope="row">{i+1} </th>
                      <th scope="row">{todo._id} </th>
                      <td>{todo.total} casos</td>
                    </tr>
                  
          )
        });
        return (
          <div className="App">
    

    
    
    
    
                  <div className="row">
                  <div className="col-md-12" >               
                       <div className="card mt-4" >
                       <div class="card-header">Top 3 Departamentos con Coronvirus</div>
                         <div className="card-body">
                         <table class="table table-hover">
                            <tbody>
                                {todos}
                            </tbody>
                        </table>
                       </div>
                    </div>
            
    
                </div>
                </div>
    
    
          </div>
        );
      }
    
    
      
    }

export default TopCasos;
