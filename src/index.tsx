/**
 * @class WebcamNative
 */

import * as React from "react";
const EXIF = require("exif-js");
import styles from "./styles.css";

export type Props = {
  accept?: string;
  onChange: (data: Object) => any;
  buttonStyle?: Object;
  label: string;
  iconComponent?: any;
};

export default class WebcamNative extends React.Component<Props> {
  private myInput = React.createRef<any>();
  constructor(props: Readonly<Props>) {
    super(props);
  }

  componentDidMount() {
    this.myInput.current.addEventListener(
      "change",
      this.cameraEventListener,
      this.myInput
    );
  }

  componentWillUnmount() {
    this.myInput.current.removeEventListener(
      "change",
      this.cameraEventListener,
      this.myInput
    );
  }

  private cameraEventListener = async (event: any) => {
    try {
      await this.processFile(event.target.files);
    } catch (error) {
      console.log(error);
    }
  };

  private handleButton = (event: any) => {
    event.preventDefault();
    const node = this.myInput.current;
    if (node) {
      node.click();
    }
  };

  private getImageDimensions = (file: any) => {
    return new Promise(function(resolved) {
      var i = new Image();
      i.onload = function() {
        resolved({ w: i.width, h: i.height });
      };
      i.src = file;
    });
  };

  private createImage = (data: any) => {
    return new Promise(resolve => {
      const img = document.createElement("img");
      img.onload = () => resolve(img);
      img.src = data;
    });
  };

  private fixOrientation = async (img: any) => {
    let width = img.width,
      height = img.height,
      canvas = document.createElement("canvas"),
      ctx = canvas.getContext("2d");
    await EXIF.getData(img, () => {
      const orientation = EXIF.getAllTags(this).Orientation;
      if (4 < orientation && orientation < 9) {
        canvas.width = height;
        canvas.height = width;
      } else {
        canvas.width = width;
        canvas.height = height;
      }
      switch (orientation) {
        case 2:
          ctx && ctx.transform(-1, 0, 0, 1, width, 0);
          break;
        case 3:
          ctx && ctx.transform(-1, 0, 0, -1, width, height);
          break;
        case 4:
          ctx && ctx.transform(1, 0, 0, -1, 0, height);
          break;
        case 5:
          ctx && ctx.transform(0, 1, 1, 0, 0, 0);
          break;
        case 6:
          ctx && ctx.transform(0, 1, -1, 0, height, 0);
          break;
        case 7:
          ctx && ctx.transform(0, -1, -1, 0, height, width);
          break;
        case 8:
          ctx && ctx.transform(0, -1, 1, 0, 0, width);
          break;
        default:
          break;
      }
      ctx && ctx.drawImage(img, 0, 0);
    });
    return canvas.toDataURL("image/jpeg");
  };

  private processFile = async (files: FileList) => {
    const { accept } = this.props;
    try {
      if (files.length === 0) {
        throw new Error("Files not selected");
      }
      let file = files[0];
      let contentBuffer = await this.readFileAsync(file);
      let filedimension = null;
      let fileFixed = null;
      let fileDataResponse = null;
      if ((accept && accept.includes("image")) || !accept) {
        const fileData = await this.createImage(contentBuffer);
        fileFixed = await this.fixOrientation(fileData);
        filedimension = await this.getImageDimensions(fileFixed);
        fileDataResponse = {
          type: accept ? accept : "image/*",
          dataUrl: fileFixed,
          dimension: filedimension
        };
      } else {
        fileDataResponse = {
          type: accept,
          dataUrl: contentBuffer
        };
      }
      this.props.onChange(fileDataResponse);
    } catch (error) {
      console.log(error);
    }
  };

  private readFileAsync = async (file: File) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  render() {
    const { accept, buttonStyle, label, iconComponent } = this.props;

    return (
      <div>
        <input
          ref={this.myInput}
          type="file"
          accept={accept ? accept : "image/*"}
          style={{ display: "none" }}
          onClick={(event: any) => {
            event.target.value = null;
          }}
        />
        <button
          className={styles.ripple}
          style={buttonStyle}
          onClick={this.handleButton}
        >
          {iconComponent}
          {label}
        </button>
      </div>
    );
  }
}
