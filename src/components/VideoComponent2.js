import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../assets/Lottie/video2.json'; // Asegúrate de importar correctamente tu animación Lottie

const VideoComponent2 = () => {
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
      <Lottie options={defaultOptions} height={600} width={1000} />
    </div>
  );
};

export default VideoComponent2;
