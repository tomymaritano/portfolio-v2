import { BrowserRouter as Router , Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from './layouts/Layout';

import theme from './theme';

import routes from './Routes';

const App = () => {
    return (
        <ChakraProvider theme={theme}>
            <Router>
                <Layout>
                    <Routes>
                        {routes} {/* Utiliza el componente de rutas aquí */}
                    </Routes>
                </Layout>
            </Router>
        </ChakraProvider>
    );
};

export default App;

