import React from "react";
import {
  Box, Container, Text,
  Heading,
  Divider
} from "@chakra-ui/react";
import Github from "../components/Github";
import Projects from "../components/Projects";


const ProjectsPage = () => {

  return (
    <Box>
      <Container display={'flex'} flexDirection={'column'} alignItems={'flex-start'}  maxW={'container.xl'}  mt={{base: 5 ,md: 32}}>
          <Heading size={'4xl'} fontWeight={'600'} color={'customGray'}>(selected) work</Heading>
          <Divider borderColor={'customGray'} my={3} />
          <Text mb={2}>
            The nature of most my work is confidential. But please reach out—I would be happy to tell their story.
          </Text>
      </Container>
      <Projects />
      <Github />
    </Box>
  );
};

export default ProjectsPage;
