import React, { useEffect, useReducer, useState} from 'react';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
//import customTheme from './theme';

import Footer from './components/Footer';
import Menu from './components/Menu';



export const OrderContext = React.createContext()

const axios = require('axios')


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
    //console.log('ENV:',REACT_APP_AUTH_TOKEN)
    
    useEffect(() => {
          axios.get(process.env.REACT_APP_apiURL_MENUS)
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
        fetch(process.env.REACT_APP_apiURL_EXCHANGE)
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

