import React from 'react';
import { Box, Container, Divider, Flex, Text } from '@chakra-ui/react';

const Experience = () => {
    return (
        <Box borderRadius={'xl'} bg={'customBackground'}>
            <Container maxW={'container.xl'} py={32}>
                <Divider borderColor={'customGray'} mt={6} />
                <Flex dir='row'>
                    <Box w={'40%'} color={'customGray'}>
                        <Text py={2} >
                            EXPERIENCE
                        </Text>
                    </Box>
                    <Box display={'flex'} flexDir={'column'} w={'60%'} color={'customGray'}>
                        <Box my={2}>
                            <Text fontWeight={'600'}>
                                Unicoin
                            </Text>
                            <Text my={0}>
                                TEAM LEAD, UX/UI DEVELOPER
                            </Text>
                        </Box>
                        <Divider borderColor={'customGray'} />
                                                <Box my={2}>
                            <Text fontWeight={'600'}>
                                Dolar Gaucho
                            </Text>
                            <Text my={0}>
                                FOUNDER
                            </Text>
                        </Box>
                        <Divider borderColor={'customGray'} />
                        <Box my={2}>
                            <Text fontWeight={'600'} >
                                Unicorn Hunters
                            </Text>
                            <Text my={0}>
                                UI DESIGNER
                            </Text>
                        </Box>
                        <Divider borderColor={'customGray'} />
                        <Box my={2}>
                            <Text fontWeight={'600'}>Grandvalira SAEDTE</Text>
                            <Text my={0}>
                                DEVELOPER
                            </Text>
                        </Box>
                        <Divider borderColor={'customGray'} />
                        <Box my={2}>
                            <Text fontWeight={'600'}>Wolt Markets </Text>
                            <Text my={0}>
                                TEAM LEAD, PRODUCT MANAGMENT
                            </Text>

                        </Box>
                        <Divider borderColor={'customGray'} />
                        <Box my={2}>

                            <Text fontWeight={'600'} >Su Web Express</Text>
                            <Text my={0}>
                                FRONT-END DEVELOPER
                            </Text>
                        </Box>

                    </Box>
                </Flex>

            </Container>
        </Box>
    );
};

export default Experience;
