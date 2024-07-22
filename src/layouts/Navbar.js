import React from 'react';
import { Box, Container, Flex, IconButton, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Link, Image, useDisclosure } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Logo from '../assets/logot.png'
const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();

    return (
        <Box bg="transparent" p={4} color="black">
            <Container maxW="container.xl">
                <Flex justifyContent="space-between" alignItems="center">
                    <Box as="a" href="/">
                        <Image h={'30px'} src={Logo} />
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
                                <Link href="/Bio" mb={4} display="block">Bio</Link>
                                <Link href="/Work" mb={4} display="block">Work</Link>
                                <Link href="/Experience" display="block">Experience</Link>
                            </DrawerBody>
                        </DrawerContent>
                    </Drawer>
                </Flex>
            </Container>
        </Box>
    );
};

export default Navbar;
