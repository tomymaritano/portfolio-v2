import React from 'react';
import { Box, Container, Text } from '@chakra-ui/react';

const Footer = () => {
    return (
        <Box bg={'customGray'} p={4} color="white" mt={4}>
            <Container maxW="container.xl">
                <Text color={'customBackground'}>☻2024. THIS SITE IS 4EVER UNDER CONSTRUCTION. © TOMY MARITANO</Text>
            </Container>
        </Box>
    );
};

export default Footer;
