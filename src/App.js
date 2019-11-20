import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';

class App extends Component {
  
  agregarTarea =(evento)=>{
    if(evento.which === 13){
      console.log(evento.target.value);
      this.props.agregar(evento.target.value, this.props.id)
      evento.target.value = "";
    }
    
  }
 
  render(){
    const elementosTareas = this.props.tarea.map((tarea)=>{
    return <h2 key={tarea.id}> {tarea.tarea} </h2>
    })
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div>
            {this.props.informacion}
            <br/>
            <button onClick={this.props.aumentar}>Aumentar</button>
            <br/>
            <br/>
            <button onClick={this.props.disminuir}>Disminuir</button>
            <br/>
            <input onKeyPress={this.agregarTarea}/>
            <br/>
            {elementosTareas}
            <br/>

            Edit <code>src/App.js</code> and save to reload.
            
          </div>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >Learn React
          </a>
          
        </header>
      </div>
    );
  }
  }
  
//internamente hace una subscripcion y un getState por lo que constantemente
//en caso de un cambio en el state se actualiza o se vuelve a ejecutar

const mapStateToProps = (state)=>{
  return {
    informacion: state.numero.cantidad,
    tarea: state.tareas,
    id: state.id 
  }
}
/*const mapDispatchToProps = {
  aumentar: ()=>{return{type: "AUM"}},
  dismunuir: ()=>{return{type: "DIS"}}
}*/
const mapDispatchToProps = (dispatch) => {
  return{
    aumentar: ()=>{dispatch(
      (dispatch)=>{
        setTimeout(()=>{ return dispatch({type:"AUM"})},3000);
       
      }
      );},
    disminuir: ()=>{
      setTimeout(()=>{dispatch({type:"DIS"});}, 
      5000);
      },
    //disminuir: ()=>{dispatch({type:"DIS"});},

    agregar: (tarea, id)=>{dispatch({type:"ADD",tarea,id});}
  } 
}



//connect nos permite acceder al state y hacer dispatch de actions y actions creator
export default connect(mapStateToProps, mapDispatchToProps)(App);
