import { Box, Heading, Text, Image, Divider } from '@chakra-ui/react';
import React from 'react';
import imagen2 from '../assets/123123.png';
import MarqueeText from './MarqueeText';

const MainHero = () => {
    return (
        <Box display={'flex'} flexDir={{ base: 'column', md: 'row' }} alignItems={'start'} justifyContent={'space-between'}>
            <Box textAlign={{ base: 'center', md: 'start' }}><Divider border={'2px'} borderColor={'customGreen'} w={'40px'} />
                <MarqueeText />
                <Heading color={'customGreen'} size={'2xl'}>Don't you?</Heading>
                
                <Box py={10}>
                    <Text color={'customGreen'} fontSize={'xl'}>Every great project begins with a challenge. Together, we transform challenges into innovation.</Text>
                </Box>
            </Box>
            <Box>
                <Image
                    height={'230px'}
                    src={imagen2}
                    transition="transform 0.2s"
                    _hover={{
                        transform: 'scale(1.05)' // Zoom efecto al pasar el cursor
                    }}
                />
            </Box>
        </Box>
    );
};

export default MainHero;
