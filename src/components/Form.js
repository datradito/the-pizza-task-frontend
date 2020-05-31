import React, {useState, useContext} from 'react';
import { OrderContext } from '../App'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    useDisclosure
  } from "@chakra-ui/core";

const PASSWORD = 'testingpurpose'

const apiURL_CreateOrder = 'https://the-pizza-task-backend.herokuapp.com/tasks'
const AUTH_TOKEN='Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWNkNjZiNDliNjBlZjAwMTc0Yjg4OWYiLCJpYXQiOjE1OTA1ODgzNTJ9.T5lW6nvLrUJSGQ0doOXqCkr9xeWQiYUmojxNRXcIEKQ'
const apiURL_EXCHANGE = 'https://api.exchangeratesapi.io/latest?symbols=USD';
const apiURL_CREATE_USER = 'https://the-pizza-task-backend.herokuapp.com/users/';

const ORDER_MOCK = {            
    "order":[
    {"description": "pizza napolitana","units":5,"price":55.99},
    {"description": "pizza margherita","units":"3","price":"55.99"},
    {"description": "pizza Buenos Aires","units":"1","price":"54.99"},
    {"description": "pizza Munich","units":10, "price":54.99},
    {"description": "pizza Franckfurt","units":10, "price":54.99}
    ],
"completed": true}

const axios = require('axios')

const Form = (props) => {
    const state = useContext(OrderContext)

    const { isOpen, onOpen, onClose } = useDisclosure();


    const initialRef = React.useRef();
    const finalRef = React.useRef();

    const [fullname, setFullname] = useState('');
    const [contactnumber, setContactnumber] = useState('');
    const [adrress_deli, setAdrress_deli] = useState('');
    const [email, setEmail] = useState('');
    //const [end_order, setEndOrder] = useState()

    const handleChangeFullname = event => setFullname(event.target.value);
    const handleChangeContactnumber = event => setContactnumber(event.target.value);
    const handleChangeAdrress_deli = event => setAdrress_deli(event.target.value);
    const handleChangeEmail = event => setEmail(event.target.value);

    const  post_ORDER = () => {
        const ORDER = { order : props.order}
        axios(
            {
                method: 'post',
                url:apiURL_CreateOrder,
                headers:{'Authorization':AUTH_TOKEN},
                data: ORDER
            })
            .then(res=> {
                console.log(res)
                const menu = state.orderState.order
                for(let i=0; i<menu.length;i++){menu[i].units=0}
                state.orderDispatch({ type:'RESET_ALL', order:menu})
            })
            .catch(e=>console.log('Error:', e))
        }
    const post_USER =(data) => {
      axios(
        {
            method: 'post',
            url:apiURL_CREATE_USER,
            data: {...data, password:'testPasword'}
        })
        .then(res=> {
            console.log(res)
        })
        .catch(e=>console.log('Error:', e))
    }          
        

    const onSubmit = () => {
        const data = {
            name: fullname,
            phone: contactnumber,
            address: adrress_deli,
            email:email
        }
        console.log('DATA', data)
        post_ORDER()
        post_USER(data)
        onClose()
    }  

    return (
      <>
        {console.log('STATE ORDER:', state)}
        {console.log('SHOWBUTTON:', !!props.showButton)}
        { !props.showButton ? 
        <Button 
          variantColor='green'
          isDisabled={true}
          onClick={onOpen}>
          PLACE ORDER
        </Button>
        : 
        <>
        <Button 
            variantColor='green'
            onClick={onOpen}>
            PLACE ORDER
        </Button>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          {/* //customer: name, contact number and delivery address */}
          <ModalContent>
            <ModalHeader>Please fill this form to proced</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl mt={4} isRequired>
                <FormLabel>FullName</FormLabel>
                <c ref={initialRef} placeholder="FullName" />
                <Input
                    value={fullname}
                    onChange={handleChangeFullname}
                    placeholder="FullName" />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Contact Number</FormLabel>
                <Input
                    value={contactnumber}
                    onChange={handleChangeContactnumber}
                    placeholder="Contact Number" />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Delivery Address</FormLabel>
                <Input
                    value={adrress_deli}
                    onChange={handleChangeAdrress_deli}
                    placeholder="Delivery Address" />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    value={email}
                    onChange={handleChangeEmail}                  
                    placeholder="Email" />
              </FormControl>

            </ModalBody>
  
            <ModalFooter>
                <Button 
                    variantColor="blue" mr={3}
                    onClick={onSubmit}
                >
                Submit
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        </>
        }
      </>
    );
  }

export default Form