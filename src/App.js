import { BrowserRouter as Router , Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from './layouts/Layout';

import theme from './theme';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';

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

