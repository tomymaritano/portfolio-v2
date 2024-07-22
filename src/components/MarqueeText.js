import { Box, keyframes, Text } from '@chakra-ui/react';

// Definir las animaciones keyframes
const marqueeAnimation = keyframes`
  0% { transform: translateX(100%); }  /* Iniciar justo fuera de la vista a la derecha */
  100% { transform: translateX(-100%); }  /* Moverse hasta quedar fuera de la vista a la izquierda */
`;

function MarqueeText() {
  return (
    <Box w={{base: '100%', md: '50%'}} p={1} color="black" display={'flex'} alignItems={'center'} justifyContent={'flex-end'} overflow="hidden" position="relative" height="60px">
      <Text
      color={'customGreen'}
        as="p"
        fontSize={'2xl'}
        position="absolute"
        whiteSpace="nowrap"
        animation={`${marqueeAnimation} 15s linear infinite`}
        width="max-content"  /* Asegura que el texto tenga suficiente ancho como para no interrumpir la animación */
      >
       I love creating cool stuff ~ ☻  ☻  ☻ 
      </Text>

    </Box>
  );
}

export default MarqueeText;
