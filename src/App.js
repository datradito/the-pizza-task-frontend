import React, { useEffect, useReducer, useState} from 'react';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
//import customTheme from './theme';

import Footer from './components/Footer';
import Menu from './components/Menu';
import Header from './components/Header';



export const OrderContext = React.createContext()

const axios = require('axios')

const AUTH_TOKEN='Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWNkNjZiNDliNjBlZjAwMTc0Yjg4OWYiLCJpYXQiOjE1OTA1ODgzNTJ9.T5lW6nvLrUJSGQ0doOXqCkr9xeWQiYUmojxNRXcIEKQ'
const apiURL_EXCHANGE = 'https://api.exchangeratesapi.io/latest?symbols=USD';
const apiURL_MENUS = 'https://the-pizza-task-backend.herokuapp.com/menu';
const apiURL_USER = 'https://the-pizza-task-backend.herokuapp.com/users/me';

const initialState = {
    loading: true,
    order: [],
    error: ''
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'ADD':
            return {
                ...state,
                order: action.order
            }
        case 'SUB':
            return {
                ...state,
                order: action.order
            }
        case 'RESET':
                return {
                ...state,
                order: action.order
                }
        case 'RESET_ALL':
            return {
                ...state,
                order: action.order
                }            
        case 'FETCH_SUCCESS':
            return {
                loading: false,
                order: action.payload,
                error: ''
            }
        case 'FETCH_ERROR':
            return {
                loading: false,
                order: [],
                error: 'Menu is not available...'
            }
        default:
            return state
    }
}

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [exchange, setExchange] = useState({})
  
    
    useEffect(() => {
          axios.get(apiURL_MENUS)
            .then(res=>{
                //Initialize order
                const menu = res.data[0].pizzas
                for(let i=0; i<menu.length;i++){menu[i].units=0}
                console.log('Initial Order with units=0 :', menu)
                dispatch({ 
                    type: 'FETCH_SUCCESS',
                    payload:menu
                })
            })  
        fetch(apiURL_EXCHANGE)
          .then(res => res.json())
          .then(response => {
            const {rates} = response;
            setExchange(rates)
          })
    },[])


  return (
    <ThemeProvider>
      <CSSReset />
      <OrderContext.Provider value={{orderState: state, orderDispatch:dispatch}}>
        <Menu rate={exchange}/>
        <Footer rate={exchange}/>
      </OrderContext.Provider>
    </ThemeProvider>
  )}
  

export default App

