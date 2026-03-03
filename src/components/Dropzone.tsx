import React, { useState } from 'react';
import { useStore } from '@/store/store';
import Card from '@/typings/card';
import Dropicon from '@/assets/icons/dropicon.svg';

interface DropzoneProps {
  card: Card;
}

const Dropzone: React.FC<DropzoneProps> = ({ card }) => {
  const uploadFile = useStore((s) => s.uploadFile);
  const activeCard = useStore((s) => s.activeCard) as Card;
  const [isDragActive, setIsDragActive] = useState(false);

  const drop = (e: React.DragEvent) => {
    e.preventDefault();
    const acceptedFile = e.dataTransfer.files[0];
    uploadFile(activeCard, acceptedFile);
    setIsDragActive(false);
  };

  const upload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const acceptedFile = e.target.files?.[0];
    if (acceptedFile) {
      uploadFile(activeCard, acceptedFile);
    }
  };

  return (
    <div
      className={`w-full h-40 border-4 border-gray-400 border-dashed ${isDragActive ? 'border-gray-800' : ''}`}
      data-test-id="upload-image"
      onDragEnter={(e) => {
        e.preventDefault();
        setIsDragActive(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setIsDragActive(false);
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={drop}
    >
      <div className="grid justify-center items-center w-full h-32 min-h-full">
        <Dropicon className={`place-self-end w-48 text-gray-400 fill-current ${isDragActive ? 'fill-current text-gray-800' : ''}`} />
        <div className={`min-w-min text-center text-gray-400 ${isDragActive ? 'text-gray-800' : ''}`}>
          {isDragActive ? 'Release to upload...' : 'Drag and drop here or'}
        </div>
        <label
          htmlFor="dropzoneFile"
          className={`self-start place-self-center py-1.5 px-3 mt-2 text-gray1 bg-gray-400 cursor-pointer ${isDragActive ? 'bg-gray-800' : ''}`}
        >
          select image
        </label>
      </div>
      <input id="dropzoneFile" type="file" className="hidden" accept="image/png, image/jpeg" onChange={upload} />
    </div>
  );
};

export default Dropzone;
