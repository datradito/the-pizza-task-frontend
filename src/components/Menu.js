import React from 'react';
import { 
    List, ListItem, ListIcon, Box, 
    PseudoBox, 
    NumberInput,
    NumberInputField, 
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper
 } from "@chakra-ui/core";
import pizzas from '../mocks/pizzas.json';

const Menu = () => (
    <Box borderWidth="1px" rounded="md" overflow="hidden">

        {pizzas.map( pizza => (
                <PseudoBox key={pizza} px={4} py={2} bg="white" _odd={{ bg: "gray.100" }}>
                    {pizza.name} ${pizza.price} | 
                    <NumberInput step={5} defaultValue={15} min={10} max={30}>
                            <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                        </NumberInput>
                </PseudoBox> 

        ))}
    </Box>
)

export default Menu
