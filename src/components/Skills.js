import { Box, Text, Divider, Stack, Link } from '@chakra-ui/react';
import React from 'react';


const Skills = () => {
    return (
        <Box width={'40%'} border={'1px solid'} borderColor={'gray.900'} borderRadius={'md'} px={5} py={8}>
            <Box mb={10}>
                <Text fontSize="2xl" color="black" fontWeight={'600'}>designer.</Text>
                <Text fontSize="2xl" color="black" fontWeight={'600'}>developer.</Text>
                <Text fontSize="2xl" color="customBeige" fontWeight={'600'}>fintech enthusiast. ☻
                </Text>
            </Box>
            <Box mb={10}>
                <Text fontSize={'sm'} fontStyle={'italic'} mb={5}> FORMERLY, LEADING UNICOIN WEB TEAM TO BUILD THE NEXT BEST EXPERIENCE FOR A NEW INVESTMENT ERA.</Text>
                <Divider borderColor={'gray.900'} />
                <Box my={3}>
                    <Text fontSize={'md'}> TRUSTED GLOBALLY.</Text>
                    <Text fontSize={'sm'} as={'b'}>Unicoin, Unicorn Hunters, SheWorks, Grandvalira, SAEDTE, SWE</Text>
                </Box>
                <Divider borderColor={'gray.900'} />
                <Box my={3}>
                    <Text fontSize={'md'}>AVAILABILITY</Text>
                    <Text fontSize={'sm'} as={'b'}>Open for a new adventure.</Text>
                </Box>
                <Divider borderColor={'gray.900'} />
                <Box my={3}>
                    <Text fontSize={'md'}> LOCATION.</Text> <Text fontSize={'sm'} as={'b'}>
                        Between Copenhagen, Rosario and Spain.</Text>
                </Box>
                <Divider borderColor={'gray.900'} />
                <Box my={3}>
                    <Text fontSize={'md'}> CONNECT</Text>
                    <Stack my={3}>
<Box as='button' textAlign={'start'} borderRadius='sm' bg='customGray' color='white' px={3} h={14}
     transition="all 0.3s cubic-bezier(.08,.52,.52,1)"
     boxShadow="2px 2px 10px rgba(0, 0, 0, 0.1)"
     _hover={{
       bg: 'customBeige',
       color: 'customGray',
       transform: 'translateY(-4px) scale(1.05)',
       boxShadow: '4px 4px 20px rgba(0, 0, 0, 0.2)'
     }}>
    <Link href="https://read.cv/tomymaritano" isExternal>
        READ.CV
    </Link>
</Box>

<Box as='button' textAlign={'start'} borderRadius='sm' bg='customGray' color='white' px={3} h={14}
     transition="all 0.3s cubic-bezier(.08,.52,.52,1)"
     boxShadow="2px 2px 10px rgba(0, 0, 0, 0.1)"
     _hover={{
       bg: 'customBeige',
       color: 'customGray',
       transform: 'translateY(-4px) scale(1.05)',
       boxShadow: '4px 4px 20px rgba(0, 0, 0, 0.2)'
     }}>
    <Link href="https://www.linkedin.com/in/tomymaritano" isExternal>
        LinkedIn
    </Link>
</Box>

<Box as='button' textAlign={'start'} borderRadius='sm' bg='customGray' color='white' px={3} h={14}
     transition="all 0.3s cubic-bezier(.08,.52,.52,1)"
     boxShadow="2px 2px 10px rgba(0, 0, 0, 0.1)"
     _hover={{
       bg: 'customBeige',
       color: 'customGray',
       transform: 'translateY(-4px) scale(1.05)',
       boxShadow: '4px 4px 20px rgba(0, 0, 0, 0.2)'
     }}>
    <Link href="https://www.instagram.com/tomymaritano" isExternal>
        Social
    </Link>
</Box>
                    </Stack>

                </Box>

            </Box>
        </Box>
    );
};

export default Skills;
