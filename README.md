# react-webcam-as

> This is a react component providing native camera support for iOS and Android devices

[![NPM](https://img.shields.io/npm/v/react-webcam-as.svg)](https://www.npmjs.com/package/react-webcam-as) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

### Features

> User can capture video, audio and images using any device [`iPhone and Anroid`]

> User can cusomises styles of button

> Image orientaion fix support provided

## Install

```bash
npm install --save react-webcam-as
```

## Usage

```tsx
import * as React from "react";

import WebcamNative from "react-webcam-as";

class Example extends React.Component {
  state = {
    webcamData: null
  };
  handleOnChange = data => {
    this.setState({ webcamData: data });
  };
  render() {
    const { webcamData } = this.state;
    return (
      <div>
        <WebcamNative
          accept="image/*"
          label="Camera"
          onChange={this.handleOnChange}
          buttonStyle={{ textTransform: "none" }}
        />
        {webcamData && webcamData.type && webcamData.type.includes("image") && (
          <img
            src={webcamData.dataUrl}
            alt="webcam"
            width="100%"
            style={{ imageOrientation: "from-image" }}
          />
        )}
        {webcamData && webcamData.type && webcamData.type.includes("video") && (
          <video controls width="100%">
            <source src={webcamData.dataUrl} />
          </video>
        )}
        {webcamData && webcamData.type && webcamData.type.includes("audio") && (
          <audio controls>
            <source src={webcamData.dataUrl} />
          </audio>
        )}
      </div>
    );
  }
}
```

## WebcamNative Props

Here Is info about Component props and their types and use example.

| Props         | Type                    | Values                                 |
| ------------- | ----------------------- | -------------------------------------- |
| accept        | `string`                | `"image/*", "video/*","audio/*"`       |
| onChange      | `(data: Object) => any` | `"onChange will return captured data"` |
| buttonStyle   | `Object`                | `eg. buttonStyle={{ color: "black"}}`  |
| label         | `String`                | `eg. label="Capture Video"`            |
| iconComponent | `Node`                  | `This for custom icon in button`       |

## License

MIT © [seerviashish](https://github.com/seerviashish)
