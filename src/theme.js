// theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
      styles: {
    global: {
      // Aplica estilos globalmente a todos los elementos body
      body: {
        bg: '#9B9BAA', // Cambia aquí el color deseado
        color: 'black',
      }
    }
  },
    colors: {
    customGreen: '#bafcab', // Nombre clave del color personalizado
    customBeige: '#d1ccb8',
    customGray: '#232323',
    customBackground: '#9B9BAA',
  },
  fonts: {
    heading: 'Roboto, sans-serif',
    body: 'Roboto, sans-serif',
    mono: 'Menlo, monospace'
  },
  fontWeights: {
    regular: 300,
    normal: 400,
    medium: 600,
    bold: 700
  },
  fontSizes: {
    xs: '0.75rem',   // 12px
    sm: '0.875rem',  // 14px
    md: '1rem',      // 16px
    lg: '1.125rem',  // 18px
    xl: '1.25rem',   // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '4rem'       // 64px
  }
});

export default theme;
