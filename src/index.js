import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

//const state = {cantidad: 2};

const reducerNumero = (state = {cantidad: 2}, action)=>{
  var nuevoEstado = Object.assign({},state);
  if(action.type === 'AUM'){
    console.log("dentro del reducer con el action type === AUM");
    nuevoEstado.cantidad = state.cantidad + 1;
  }else if(action.type === 'DIS'){
    nuevoEstado.cantidad = state.cantidad - 1;
  }
  return nuevoEstado;
}

const reducerTareas = (state = [], action) => {
  var nuevoEstado = Object.assign({},state);
  if(action.type === 'ADD'){
    nuevoEstado = state.concat([{tarea: action.tarea, id: action.id}]);
    console.log(nuevoEstado);
    
    return nuevoEstado;
  }
  return state;
}
const reducerId = (state = 1, action) => {
  var nuevoEstado = Object.assign({}, state);
  if(action.type === 'ADD'){
    nuevoEstado = state + 1;
    return nuevoEstado;
  }
  
  return state;
}
//combineReducers toma como parametro un objeto javascript con los demas
//reducers como valores.
const reducer = combineReducers({
    numero: reducerNumero,
    tareas: reducerTareas,
    id: reducerId
});

const store = createStore(reducer, applyMiddleware(ReduxThunk));

ReactDOM.render(
  //I. Implementar el PROVIDER
  <Provider store={ store }>
      <App/>
  </Provider>
, document.getElementById('root'));


serviceWorker.unregister();

