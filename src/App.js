import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/Layout';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';

const App = () => {
    return (
        <ChakraProvider theme={theme}>
            <Layout>
                <Router>
                    <Routes>
                        <Route path="/" element={<Navigate replace to="/bio" />} />
                        <Route path="/bio" element={<HomePage />} />
                        <Route path="/work" element={<ProjectsPage />} />
                    </Routes>

                </Router>
            </Layout>
        </ChakraProvider>
    );
};

export default App;

