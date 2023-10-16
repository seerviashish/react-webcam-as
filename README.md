# REACT-WEBCAM-AS

![main](https://github.com/seerviashish/react-webcam-as/actions/workflows/main.yml/badge.svg) ![codeql](https://github.com/seerviashish/react-webcam-as/actions/workflows/codeql.yml/badge.svg) [![npm version](https://badgen.net/npm/v/react-webcam-as)](https://npm.im/react-webcam-as) [![npm downloads](https://badgen.net/npm/dm/react-webcam-as)](https://npm.im/react-webcam-as) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> This is a react component providing native camera support for iOS and Android devices

## Demonstration

[Demonstration Link](https://seerviashish.github.io/react-webcam-as)

## Features

> User can capture video, audio and images using any device [`iPhone and Android`]
> User can customizes styles of button
> Image orientation fix support provided
> User can upload images, video and audio
> User can capture image without exif data
> Component can be easily extended and have type definition for typescript support
> Supported react 17+ versions

## Install

```bash
npm install --save react-webcam-as
```

or

```bash
yarn add react-webcam-as
```

## How to set up a project?

1. Clone a repository.

````bash
git clone https://github.com/seerviashish/react-webcam-as.git
```
- If you are using ssh, use the below command to clone the repository

```bash
git clone https://github.com/seerviashish/react-webcam-as.git
````

2. Go to react-webcam-as folder.

```bash
cd react-webcam-as
```

3. Install dependencies using yarn.

```bash
yarn
```

## Usage in react 17+ version

```tsx
import React, { useState } from 'react';
import { Webcam } from 'react-webcam-as';

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
```

## WebcamNative Props

Here Is info about Component props and their types and use example.

| Props         | Type                    | Values                                          |
| ------------- | ----------------------- | ----------------------------------------------- |
| accept        | `string`                | `"image/*", "video/*","audio/*"`                |
| onChange      | `(data: Object) => any` | `"onChange will return captured data"`          |
| style         | `Object`                | `eg. style={button: { color: "black"}}`         |
| label         | `String`                | `eg. label="Capture Video"`                     |
| iconComponent | `Node`                  | `This for custom icon in button`                |
| className     | `string`                | `Custom class name can used to override styles` |

## License

MIT © [seerviashish](https://github.com/seerviashish)
