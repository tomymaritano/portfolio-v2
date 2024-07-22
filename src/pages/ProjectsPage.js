import React from "react";
import {
  Box, Container
} from "@chakra-ui/react";
import Github from "../components/Github";

const ProjectsPage = () => {

  return (
    <Box>
        <Container mt={20} maxW={'container.xl'}>
            <Github />
        </Container>
    </Box>
  );
};

export default ProjectsPage;
