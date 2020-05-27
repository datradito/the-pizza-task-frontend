import React from 'react';
import {Box, Heading, Text} from '@chakra-ui/core';


const Footer = (props) => (
    <Box maxW="32rem">
    <Heading mb={4}>Exchange rate Euros per dollar of the day:</Heading>
    <Text fontSize="md">
        {props.rate}
    </Text>
    </Box>
)

export default Footer
