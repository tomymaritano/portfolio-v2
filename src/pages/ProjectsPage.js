import React from 'react';
import Slider from 'react-slick';
import { Box, Container, Flex, Text, Heading, Link } from '@chakra-ui/react';
import VideoComponent from '../components/VideoComponent';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import VideoComponent2 from '../components/VideoComponent2';

const ProjectsPage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  return (
    <Box>
      <Container maxW={'container.xl'} my={{ base: 5, md: 32 }}>
        <Heading size={'2xl'} fontWeight={'500'} mb={10}>Some works</Heading>
        <Slider {...settings}>
          <div>
            <Flex direction={'column'} alignItems={'center'}>
              <Text fontSize={'2xl'} as={'b'}>Unicoin Dashboard</Text>
              <Text fontSize={'lg'}>Investor's platform</Text>
              <Link href="http://www.unicoin.com" >View Project</Link>
              <VideoComponent />
            </Flex>
          </div>
          <div>
            <Flex direction={'column'} alignItems={'center'}>
              <Text fontSize={'2xl'} as={'b'}>Project 2</Text>
              <Text fontSize={'lg'}>Description of Project 2</Text>
              <Link href="http://www.example.com" >View Project</Link>
              <VideoComponent2 />
            </Flex>
          </div>
          {/* Replicate above div for more projects */}
        </Slider>
      </Container>
    </Box>
  );
};

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

export default ProjectsPage;
