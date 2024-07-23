import React from 'react';
import { Box, Container, Link as ChakraLink, Flex, IconButton, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Image, useDisclosure } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link as ReactRouterLink } from 'react-router-dom';

import Logo from '../assets/logot.png'
const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();

    return (
        <Box bg="transparent" p={4} color="black">
            <Container maxW="container.xl">
                <Flex justifyContent="space-between" alignItems="center">
                    <Box as="a" href="/">
                        <Image height={'30px'} src={Logo} />
                    </Box>
                    <IconButton
                        ref={btnRef}
                        icon={<HamburgerIcon />}
                        onClick={onOpen}
                        variant="none"
                        aria-label="Open Menu"
                    />
                    <Drawer
                        isOpen={isOpen}
                        placement="right"
                        onClose={onClose}
                        finalFocusRef={btnRef}
                    >
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerCloseButton />
                            <DrawerHeader>Tomy Maritano</DrawerHeader>
                            <DrawerBody>
                                <ChakraLink as={ReactRouterLink} to="/" mb={4} display="block">Bio</ChakraLink>
                                <ChakraLink as={ReactRouterLink} to="/Work" mb={4} display="block">Work</ChakraLink>
                            </DrawerBody>
                        </DrawerContent>
                    </Drawer>
                </Flex>
            </Container>
        </Box>
    );
};

export default Navbar;
