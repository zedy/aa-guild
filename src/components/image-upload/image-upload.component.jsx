// libs
import React, { useState } from 'react';
import ImageUploading from 'react-images-uploading';
import { toastr } from 'react-redux-toastr'

// firebase
import { imageUpload } from '../../firebase/firebase.utils';

const ImageUpload = ({ fileName, callback, path, presetImage, defaultImage, isAvatar, children }) => {
  const [images, setImages] = useState([]);

  const onChange = async imageList => {
    setImages(imageList);
    const filename = generateFileName(imageList[0].file);
    const response = await imageUpload(imageList[0].file, filename, path);
    toastr[response.status](response.message);
    callback(response.imgUrl);
  };

  const generateFileName = file => {
    const ext = file.type.split('/');
    
    return fileName + '.' + ext[1];
  }

  return (
    <div className="ui grid centered" style={{margin: '20px 0'}}>
     <ImageUploading        
        value={images}
        onChange={onChange}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
        }) => (
          <div className="wrapper">            
            {
              !imageList.length ?
              <img alt="" className={`ui medium image ${isAvatar ? "circular" : ""}`} src={presetImage ? presetImage : defaultImage} />
              :
              null
            }     
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img className={`ui medium image ${isAvatar ? "circular" : ""}`} src={image['data_url']} alt="image-upload-placeholder" style={{width: "100%"}} />
              </div>
            ))}
            <button style={{marginTop: "20px"}} 
              className="ui button teal"           
              onClick={onImageUpload}
            >
              Click to upload
            </button>
          </div>
        )}
      </ImageUploading>
      { children }
    </div>
  )
}

export default ImageUpload;