import React from "react";
import {
    Box, Heading, Image, Text, Container,
    Divider,
    Button,
    VStack,
    Link
} from "@chakra-ui/react";
import Image1 from '../assets/Bmockup.png'
import Image2 from '../assets/giftest.gif'


const Projects = () => {


    return (
        <Box borderRadius={'xl'} bg={'customGray'}>
            <Container color={'white'} maxW={'container.xl'} py={32}>
                <Box>
                    <Text as="h1" size="md" mb={10} color={'white'}>TOKENIZATION</Text>
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <Heading fontFamily={'monospace'} as="h1" size="lg" mb={4} fontWeight={'400'} color={'white'}>Unicoin, ICO 30th September</Heading>
                        <Heading fontFamily={'monospace'} as="h1" size="2xl" mb={4} fontWeight={'400'} color={'white'}>01</Heading>
                    </Box>
                    <Box maxW={'container.xl'} display={'flex'} flexDir={{ base: "column", md: "row" }}>
                        <Image borderRadius={'lg'} w={{ base: "100%", md: "75%" }} src={Image1} />
                        <VStack mt={3} justifyContent={'flex-end'} mx={2} border={'1px solid'} spacing={2} align={'start'} flex="1" bg={'transparent'} borderRadius={'lg'} p={5}>
                            <Text fontSize={'sm'}>PROJECT</Text>
                            <Text>ICO launching project</Text>
                            <Divider my={1} />
                            <Text fontSize={'sm'} >TEAM</Text>
                            <Text>Unicoin Creative Tech Team</Text>
                            <Divider my={1} />
                            <Text fontSize={'sm'} >TIMELINE</Text>
                            <Text>30 Days</Text>
                            <Divider my={1} />
                            <Text fontSize={'sm'}>ROLE</Text>
                            <Text>Team Lead</Text>
                            <Divider my={1} />
                            <Text fontSize={'sm'}>CONTRIBUTION</Text>
                            <Text>Design Vision + Product Strategy</Text>
                            <Button>View Project</Button>
                        </VStack>

                    </Box>
                </Box>
                <Divider my={30} />
                <Box>
                    <Text as="h1" size="md" mb={10} color={'white'}>A NEW ERA IN INVESTMENTS</Text>
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <Heading fontFamily={'monospace'} as="h1" size="lg" mb={4} fontWeight={'400'} color={'white'}>Unicoin, Investors Dashboard</Heading>
                        <Heading fontFamily={'monospace'} as="h1" size="2xl" mb={4} fontWeight={'400'} color={'white'}>02</Heading>
                    </Box>
                    <Box maxW={'container.xl'} display={'flex'} flexDir={{ base: "column", md: "row-reverse" }}>
                        <Image borderRadius={'lg'} w={{ base: "100%", md: "75%" }} src={Image2} /> 
                        <VStack mt={3} justifyContent={'flex-end'} mx={2} border={'1px solid'} spacing={2} align={'start'} flex="1" bg={'transparent'} borderRadius={'lg'} p={5}>
                            <Text fontSize={'sm'}>PROJECT</Text>
                            <Text>Investors Dashboard</Text>
                            <Divider my={1} />
                            <Text fontSize={'sm'} >TEAM</Text>
                            <Text>Unicoin Creative Tech Team</Text>
                            <Divider my={1} />
                            <Text fontSize={'sm'} >TIMELINE</Text>
                            <Text>90 Days</Text>
                            <Divider my={1} />
                            <Text fontSize={'sm'}>ROLE</Text>
                            <Text>UX Developer</Text>
                            <Divider my={1} />
                            <Text fontSize={'sm'}>CONTRIBUTION</Text>
                            <Text>Design Vision + UX Strategy</Text>

                            <Box as='button' textAlign={'start'} borderRadius='sm' bg='customBeige' color='customGray' px={3} h={14}
                                transition="all 0.3s cubic-bezier(.08,.52,.52,1)"
                                boxShadow="2px 2px 10px rgba(0, 0, 0, 0.1)"
                                _hover={{
                                    bg: 'customGreen',
                                    color: 'customGray',
                                    transform: 'translateY(-4px) scale(1.05)',
                                    boxShadow: '4px 4px 20px rgba(0, 0, 0, 0.2)'
                                }}>
                                <Link href="https://read.cv/tomymaritano" isExternal>
                                    READ.CV
                                </Link>
                            </Box>
                        </VStack>

                    </Box>
                </Box>
                         <Divider my={30} />
                 <Box>
                    <Text as="h1" size="md" mb={10} color={'white'}>A NEW ERA IN INVESTMENTS</Text>
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <Heading fontFamily={'monospace'} as="h1" size="lg" mb={4} fontWeight={'400'} color={'white'}>Unicoin, Website Rebrand</Heading>
                        <Heading fontFamily={'monospace'} as="h1" size="2xl" mb={4} fontWeight={'400'} color={'white'}>03</Heading>
                    </Box>
                </Box>
                                         <Divider my={30} />
                 <Box>
                    <Text as="h1" size="md" mb={10} color={'white'}>FINTECH ARG</Text>
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <Heading fontFamily={'monospace'} as="h1" size="lg" mb={4} fontWeight={'400'} color={'white'}>DolarGaucho, Foundation</Heading>
                        <Heading fontFamily={'monospace'} as="h1" size="2xl" mb={4} fontWeight={'400'} color={'white'}>04</Heading>
                        <Link href="www.dolargaucho.com.ar">View</Link>
                    </Box>
                </Box>                         <Divider my={30} />
                 <Box>
                    <Text as="h1" size="md" mb={10} color={'white'}>SKYING AND TURISM</Text>
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <Heading fontFamily={'monospace'} as="h1" size="lg" mb={4} fontWeight={'400'} color={'white'}>Grandvalira, Employees Control Web App </Heading>
                        <Heading fontFamily={'monospace'} as="h1" size="2xl" mb={4} fontWeight={'400'} color={'white'}>05</Heading>
                    </Box>
                </Box>
            </Container>
        </Box>

    );
};

export default Projects;