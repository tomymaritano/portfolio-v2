import React from 'react';
import { Box, Container, Spacer } from '@chakra-ui/react';
import MainHero from '../MainHero';
import Skills from '../Skills';
import CollabsPage from './CollabsPage';
import Aptitudes from './Aptitudes';
import Experience from './Experiences';
import Education from './Education';

const HomePage = () => {
    return (
        <Box>
        <Container maxW={'container.xl'} my={{base: 5, md: 32}}>
                <MainHero />
                <Spacer h={20} />
                <Skills />
        </Container>
        <CollabsPage />
        <Aptitudes />
        <Experience />
        <Education />
        </Box>
    );
};

export default HomePage;
