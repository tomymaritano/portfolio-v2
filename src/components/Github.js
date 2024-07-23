import React, { useEffect, useState } from "react";
import {
  Box, Heading, Tag, Wrap, WrapItem, Text, SimpleGrid, Select, HStack, Switch, Container,
  Divider
} from "@chakra-ui/react";

const Github = () => {
  const [projects, setProjects] = useState([]);
  const [selectedTech, setSelectedTech] = useState("All");
  const [showForks, setShowForks] = useState(false);

  useEffect(() => {
    fetch("https://api.github.com/users/tomymaritano/repos")
      .then(response => response.json())
      .then(data => {
        const transformedProjects = data.map(repo => ({
          name: repo.name,
          description: repo.description || "No description",
          technologies: repo.language ? [repo.language] : ["Multiple languages"],
          html_url: repo.html_url,
          fork: repo.fork
        }));
        setProjects(transformedProjects);
      })
      .catch(error => console.error("Error fetching projects:", error));
  }, []);

  const handleTechChange = (event) => setSelectedTech(event.target.value);
  const handleShowForksChange = () => setShowForks(!showForks);

  const allTechnologies = ["All", ...new Set(projects.flatMap(p => p.technologies))];
  const filteredProjects = projects.filter(project =>
    (selectedTech === "All" || project.technologies.includes(selectedTech)) &&
    (!showForks || project.fork)
  );

  return (
    <Box borderRadius={'xl'} bg={'customGray'}>
      <Container color={'white'} maxW={'container.xl'} py={32}>
        <Divider my={10} />
     <Heading size={'2xl'} fontWeight={'500'} color={'customBackground'} pb={4}>
          Coding
        </Heading>

        <HStack justifyContent="space-between" alignItems="center">
          <HStack>
            <Text>Forks</Text>
            <Switch
              colorScheme="gray"
              id="fork-switch"
              isChecked={showForks}
              onChange={handleShowForksChange}
            />
          </HStack>

          <Select
            onChange={handleTechChange}
            size="sm"
            colorScheme="teal"
            borderRadius="md"
            w="30%"
          >
            {allTechnologies.map(tech => (
              <option key={tech} value={tech}>{tech}</option>
            ))}
          </Select>
        </HStack>

        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={5} mt={4}>
          {filteredProjects.map((project, index) => (
            <Box
              key={index}
              borderWidth="1px"
              borderRadius="md"
              p={4}
              _hover={{ bg: "customGreen", borderColor: 'customGreen', color: 'customGray', transform: "translateY(-2px)", boxShadow: "lg" }}
            >
              <Heading size="sm" pb={2}>
                <a href={project.html_url} target="_blank" rel="noopener noreferrer">
                  {project.name}
                </a>
              </Heading>
              <Text fontSize="sm">{project.description}</Text>
              <Wrap mt={2}>
                {project.technologies.map((tech, techIndex) => (
                  <WrapItem key={techIndex}>
                    <Tag size="sm" bg="customBeige">
                      {tech}
                    </Tag>
                  </WrapItem>
                ))}
              </Wrap>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>

  );
};

export default Github;