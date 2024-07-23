import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';

const App = () => {
    return (
        <ChakraProvider theme={theme}>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/work" element={<ProjectsPage />} />
                    </Routes>
                </Layout>
            </Router>
        </ChakraProvider>
    );
};

export default App;

