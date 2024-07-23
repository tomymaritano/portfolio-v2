import React from "react";
import {
  Box, Container, Flex, Text, Image,
  Button
} from "@chakra-ui/react";
import Github from "../components/Github";
import VideoComponent from "../components/VideoComponent";
import Image1 from "../assets/ipad.png"
import VideoComponent2 from "../components/VideoComponent2";


const ProjectsPage = () => {

  return (
    <Box>
      <Container maxW={'container.xl'} my={{ base: 5, md: 32 }}>
        <Flex display={'flex'} direction={'column'} gap={2}>
          <Box bg={'customGray'} color={'customBackground'} p={4} borderRadius={'lg'}>
            <Text fontSize={'2xl'} as={'b'}>Unicoin Dashboard</Text>
            <Text fontSize={'lg'} pb={10}>Investors Platform</Text>
            <VideoComponent />
            <Button>View Project</Button>
          </Box>
          <Box bg={'customGray'} color={'customBackground'} p={4} borderRadius={'lg'}>
            <Text fontSize={'2xl'} as={'b'}>Unicorn Hunters</Text>
            <Text fontSize={'lg'} pb={10}>TV Show</Text>
            <VideoComponent2 />
            <Button>View Project</Button>
          </Box>
        </Flex>

      </Container>
      <Github />
    </Box>
  );
};

export default ProjectsPage;
