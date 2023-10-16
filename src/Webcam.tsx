import React, { useEffect, useRef } from 'react';

const EXIF = require('exif-js');

interface IWebcam {
  accept?: string;
  className?: string;
  iconComponent?: any;
  label: string;
  onChange: (data: Data) => any;
  style?: { button?: React.CSSProperties; input?: React.CSSProperties };
}

type Data = {
  dataUrl: string | ArrayBuffer | null;
  dimension?: DimensionType;
  type: string;
};

type DimensionType = {
  h: number;
  w: number;
};

const Webcam: React.FC<IWebcam> = ({
  accept,
  className,
  iconComponent,
  label,
  onChange,
  style,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef?.current) return;
    inputRef.current.addEventListener('change', cameraEventListener);
    // eslint-disable-next-line consistent-return
    return () =>
      inputRef.current?.removeEventListener('change', cameraEventListener);
  }, [inputRef]);

  const cameraEventListener = async (event: any) => {
    await processFile(event.target.files);
  };

  const handleButton = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.click();
    }
  };

  const getImageDimensions = (file: string): Promise<DimensionType> =>
    new Promise((resolve, reject) => {
      const i = new Image();
      i.onload = () => resolve({ w: i.width, h: i.height });
      i.onerror = () => reject(new Error('E01: Get image dimensions failed'));
      i.src = file;
    });

  const createImage = (
    data: string | ArrayBuffer | null
  ): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      if (data == null) {
        reject(new Error('E02: Create image data null'));
      }
      const img = document.createElement('img');
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('E03: Image creation failed'));
      img.src = data as string;
    });

  const fixOrientation = async (img: HTMLImageElement): Promise<string> => {
    const { width } = img;
    const { height } = img;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('E04: Canvas context is null');
    }
    let exifError = false;
    try {
      await EXIF.getData(img, () => {
        const orientation = EXIF.getAllTags(this).Orientation;
        if (orientation > 4 && orientation < 9) {
          canvas.width = height;
          canvas.height = width;
        } else {
          canvas.width = width;
          canvas.height = height;
        }
        switch (orientation) {
          case 2:
            ctx.transform(-1, 0, 0, 1, width, 0);
            break;
          case 3:
            ctx.transform(-1, 0, 0, -1, width, height);
            break;
          case 4:
            ctx.transform(1, 0, 0, -1, 0, height);
            break;
          case 5:
            ctx.transform(0, 1, 1, 0, 0, 0);
            break;
          case 6:
            ctx.transform(0, 1, -1, 0, height, 0);
            break;
          case 7:
            ctx.transform(0, -1, -1, 0, height, width);
            break;
          case 8:
            ctx.transform(0, -1, 1, 0, 0, width);
            break;
          default:
            break;
        }
        ctx.drawImage(img, 0, 0);
      });
    } catch (e) {
      exifError = true;
      // eslint-disable-next-line no-console
      console.error(e);
    }
    return exifError ? img.src : canvas.toDataURL('image/jpeg');
  };

  const processFile = async (files: FileList) => {
    if (files.length === 0) {
      throw new Error('E05: File not selected');
    }
    const file = files[0];
    const contentBuffer = await readFileAsync(file);
    let fileDimension = null;
    let fileFixed: string | null = null;
    let fileDataResponse = null;
    if (accept?.includes('image') || !accept) {
      const imageFileElement: HTMLImageElement = await createImage(
        contentBuffer
      );
      fileFixed = await fixOrientation(imageFileElement);
      fileDimension = await getImageDimensions(fileFixed);
      fileDataResponse = {
        type: accept || 'image/*',
        dataUrl: fileFixed,
        dimension: fileDimension,
      };
    } else {
      fileDataResponse = {
        type: accept,
        dataUrl: contentBuffer,
      };
    }
    onChange(fileDataResponse);
  };

  const readFileAsync = async (
    file: File
  ): Promise<string | ArrayBuffer | null> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={accept || 'image/*'}
        style={{ display: 'none' }}
        onClick={(event: any) => {
          // eslint-disable-next-line no-param-reassign
          event.target.value = null;
        }}
      />
      <button
        className={className}
        style={style?.button}
        onClick={handleButton}
        type="submit"
      >
        {iconComponent}
        {label}
      </button>
    </div>
  );
};

export default Webcam;
