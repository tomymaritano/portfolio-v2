import React from 'react';
import { Box, Container, Divider, Flex, Heading, Text } from '@chakra-ui/react';
import Logos from '../Logos'

const CollabsPage = () => {
    return (
        <Box borderRadius={'xl'} bg={'customGray'}>
            <Container maxW={'container.xl'} py={32}>
                <Heading size={'2xl'} fontWeight={'500'} color={'customBackground'}>working collabs'</Heading>
                <Divider mt={10} />
                <Flex display={'flex'} direction={{base: 'column', md: 'row'}}>
                    <Box w={{base: '100%', md: '50%'}} color={'customBackground'}>
                        <Text py={2} >
                            I am deeply grateful for the opportunity to lead teams and spearhead the design of experiences for renowned brands such as Wolt on their Express platform, at the Grandvalira ski resort, and in financial innovations with Unicoin and Unicorn Hunters.
                        </Text>
                        <Text py={2}>Thank you to all the talented professionals and experts in technology and financial services worldwide who have trusted me to learn and lead design projects alongside them</Text>
                        <Text py={2}>If you have any questions about my role with any of these companies, I would be delighted to share more about our collaborations and achievements.</Text>
                    </Box>
                    <Box w={{base: '100%', md: '50%'}}>
                        <Logos />
                    </Box>
                </Flex>
            </Container>
        </Box>
    );
};

export default CollabsPage;
