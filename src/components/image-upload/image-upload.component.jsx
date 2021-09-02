// libs
import React, { useState } from 'react';
import ImageUploading from 'react-images-uploading';
import { toastr } from 'react-redux-toastr';

// firebase
import { imageUpload } from '../../firebase/firebase.utils';

const ImageUpload = ({
  fileName,
  activeteLoader,
  callback,
  path,
  presetImage,
  defaultImage,
  isAvatar,
  children
}) => {
  const [images, setImages] = useState([]);

  const onChange = async imageList => {
    if (activeteLoader) activeteLoader(true);

    setImages(imageList);
    const filename = generateFileName(imageList[0].file);
    const response = await imageUpload(imageList[0].file, filename, path);

    toastr[response.status](response.message);
    callback(fileName, response.imgUrl);
  };

  const attachTimeStampToImage = filename => {
    const timestamp = new Date().getTime();

    return `${filename}_${timestamp}`;
  };

  const generateFileName = file => {
    const ext = file.type.split('/');
    const filenameAttachments =
      path === 'events' ? attachTimeStampToImage(fileName) : fileName;

    return `${filenameAttachments}.${ext[1]}`;
  };

  return (
    <div className='ui grid centered' style={{ margin: '20px 0' }}>
      <ImageUploading value={images} onChange={onChange} dataURLKey='data_url'>
        {({ imageList, onImageUpload }) => (
          <div className='wrapper'>
            {!imageList.length ? (
              <img
                alt='alt tag'
                className={`ui medium image ${isAvatar ? 'circular' : ''}`}
                src={presetImage ? presetImage : defaultImage}
              />
            ) : null}
            {imageList.map((image, index) => (
              <div key={index} className='image-item'>
                <img
                  className={`ui medium image ${isAvatar ? 'circular' : ''}`}
                  src={image['data_url']}
                  alt='upload-placeholder'
                  style={{ width: '100%' }}
                />
              </div>
            ))}
            <button
              style={{ marginTop: '20px' }}
              className='ui button teal'
              onClick={e => {
                e.preventDefault();
                onImageUpload();
              }}>
              Click to upload
            </button>
          </div>
        )}
      </ImageUploading>
      {children}
    </div>
  );
};

export default ImageUpload;
