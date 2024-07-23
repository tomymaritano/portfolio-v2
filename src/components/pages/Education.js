import React from 'react';
import { Box, Container, Divider, Flex, Text } from '@chakra-ui/react';

const Education = () => {
    return (
        <Box borderRadius={'xl'} bg={'customBackground'}>
            <Container maxW={'container.xl'} py={32}>
                <Divider borderColor={'customGray'} mt={6} />
                <Flex dir='row'>
                    <Box w={'40%'} color={'customGray'}>
                        <Text py={2} >
                            EDUCATION
                        </Text>
                    </Box>
                    <Box display={'flex'} flexDir={'column'} w={'60%'} color={'customGray'}>
                        <Box my={2}>
                            <Text fontWeight={'600'}>
                                Coderhouse
                            </Text>
                            <Text my={0}>
                                PRODUCT DESIGN, PRODUCT MANAGMENT
                            </Text>
                        </Box>
                        <Divider borderColor={'customGray'} />
                        <Box my={2}>
                            <Text fontWeight={'600'} >
                                Coderhouse
                            </Text>
                            <Text my={0}>
                                UX / UI DESIGN
                            </Text>
                        </Box>
                        <Divider borderColor={'customGray'} />
                        <Box my={2}>
                            <Text fontWeight={'600'}>Escuela Da Vinci</Text>
                            <Text my={0}>
                                DESIGN & WEB DEVELOPMENT
                            </Text>
                        </Box>
                        <Divider borderColor={'customGray'} />
                        <Box my={2}>
                            <Text fontWeight={'600'} >
                                Universidad Catolica Argentina
                            </Text>
                            <Text my={0}>
                                Bachellor of Laws
                            </Text>
                        </Box>

                    </Box>
                </Flex>
            </Container>
        </Box>
    );
};

export default Education;
