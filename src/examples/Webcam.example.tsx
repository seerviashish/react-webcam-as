import React, { useState } from 'react';
import { Webcam } from '..';

export const WebcamExample: React.FC = () => {
  const [webcamData, setWebcamData] = useState<any>(null);
  const handleOnChange = (data: any) => {
    setWebcamData(data);
  };
  return (
    <div>
      <div
        style={{ display: 'flex', justifyContent: 'space-between', gap: 40 }}
      >
        <Webcam
          accept="image/*"
          label="Capture images or Upload Image"
          onChange={handleOnChange}
          style={{ button: { textTransform: 'none' } }}
        />
        <Webcam
          accept="video/*"
          label="Record video or Upload Video"
          onChange={handleOnChange}
          style={{ button: { textTransform: 'none' } }}
        />
        <Webcam
          accept="audio/*"
          label="Record audio or Upload audio"
          onChange={handleOnChange}
          style={{ button: { textTransform: 'none' } }}
        />
      </div>

      {webcamData && webcamData?.type && webcamData.type?.includes('image') && (
        <img
          src={webcamData?.dataUrl}
          alt="webcam"
          width="100%"
          style={{ imageOrientation: 'from-image' }}
        />
      )}
      {webcamData && webcamData?.type && webcamData.type?.includes('video') && (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video controls width="100%">
          <source src={webcamData.dataUrl} />
        </video>
      )}
      {webcamData && webcamData?.type && webcamData.type?.includes('audio') && (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <audio controls>
          <source src={webcamData.dataUrl} />
        </audio>
      )}
    </div>
  );
};
