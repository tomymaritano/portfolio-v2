import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Box } from '@chakra-ui/react';

const Layout = ({ children }) => {
    return (
        <Box minH="100vh" display="flex" flexDirection="column">
            <Navbar />
            <Box flex="1" bg="transparent">
                {children}
            </Box>
            <Footer />
        </Box>
    );
};

export default Layout;
