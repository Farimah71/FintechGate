import { useState } from "react";
import { GetProp, Upload, UploadFile, UploadProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { UploaderProps } from "./uploader.types";
import { Controller, ControllerRenderProps } from "react-hook-form";
import ImgCrop from "antd-img-crop";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export const Uploader = ({ name, control }: UploaderProps) => {
  const [fileList, setFileList] = useState<any[]>([]);

  const handlePreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const beforeUpload = (file: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFileList([{ url: reader.result }]);
    };

    return false;
  };

  const handleRemove = (field: ControllerRenderProps) => {
    setFileList([]);
    field.value = null;
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <ImgCrop rotationSlider>
          <Upload
            {...field}
            // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            maxCount={1}
            fileList={fileList}
            beforeUpload={beforeUpload}
            listType="picture-card"
            onPreview={handlePreview}
            onChange={(object) => field.onChange(object.fileList[0])}
            onRemove={() => handleRemove(field)}
          >
            {uploadButton}
          </Upload>
        </ImgCrop>
      )}
    />
  );
};
