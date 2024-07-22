import React from 'react';
import { Box, Container, Divider, Flex, Text } from '@chakra-ui/react';

const Aptitudes = () => {
    return (
        <Box borderRadius={'xl'} bg={'customBackground'}>
            <Container maxW={'container.xl'} py={32}>
                <Divider borderColor={'customGray'} mt={6} />
                <Flex dir='row'>
                    <Box w={'40%'} color={'customGray'}>
                        <Text py={2} >
                            APTITUDES & OBSESSIONS
                        </Text>
                    </Box>
                    <Box display={'flex'} flexDir={'column'} w={'60%'}>
                        <Text my={4} >Product Design & Strategy</Text>
                        <Divider borderColor={'customGray'} />
                        <Text my={4}>Design Thinking</Text>
                        <Divider borderColor={'customGray'} />
                        <Text my={4}>Cross-Functional Leadership</Text>
                        <Divider borderColor={'customGray'} />
                        <Text my={4}>Research</Text>
                        <Divider borderColor={'customGray'} />
                        <Text my={4}>Web app Development</Text>
                        <Divider borderColor={'customGray'} />
                        <Text my={4}>Analytical Thinking</Text>
                    </Box>
                </Flex>

            </Container>
        </Box>
    );
};

export default Aptitudes;
