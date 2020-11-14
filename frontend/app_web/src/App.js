import React, { Component } from 'react';


import './App.css';


import GraphPie from './components/GraphPie'
import GraphBAr from './components/GraphBarras'
import TopCasos from './components/TopCasos'
import LastCase from './components/LastCase'



class App extends Component  {

  constructor() {
    super();
    this.state = {
      todos: []
    }

  }



  render(){
    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <a className="navbar-brand" href="/">
                          Sistemas operativos 1  - Grupo 6
                      </a>
        </nav>
  
        <table class="table table-hover">
              <tbody>
                <tr className="table-active">

                  <td>

                    <TopCasos></TopCasos><LastCase></LastCase>
                    </td>
                  <td>
 
                  <GraphPie></GraphPie><GraphBAr></GraphBAr></td>
                </tr>

              </tbody>
            </table>


      </div>
    );
  }
}

export default App;
