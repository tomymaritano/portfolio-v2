import { BrowserRouter , Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from './layouts/Layout';

import theme from './theme';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';

const App = () => {
    return (
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/work" element={<ProjectsPage />} />
                    </Routes>
                </Layout>
            </BrowserRouter>

        </ChakraProvider>
    );
};

export default App;

