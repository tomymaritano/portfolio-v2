import { BrowserRouter , Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from './layouts/Layout';

import theme from './theme';

import routes from './Routes';

const App = () => {
    return (
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        {routes} {/* Utiliza el componente de rutas aquí */}
                    </Routes>
                </Layout>
            </BrowserRouter>
        </ChakraProvider>
    );
};

export default App;

