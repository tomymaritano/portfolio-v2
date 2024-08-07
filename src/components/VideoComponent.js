import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../assets/Lottie/test.json'; // Asegúrate de importar correctamente tu animación Lottie

const VideoComponent = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice' // Ajusta según necesidades
    }
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={600} width={'100%'} />
    </div>
  );
};

export default VideoComponent;
