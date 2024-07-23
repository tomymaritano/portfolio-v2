// Layout.js
import React from 'react';
import { Box } from '@chakra-ui/react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <Box minHeight="100vh" display="flex" flexDirection="column">
            <Navbar />
            <Box flex="1" p="4">
                {children}
            </Box>
            <Footer />
        </Box>
    );
};

export default Layout;
