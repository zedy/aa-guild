// libs
import React, { useState } from 'react';
import ImageUploading from 'react-images-uploading';

// firebase
import { imageUpload, updateUserProfile } from '../../firebase/firebase.utils';

const UserPic = ({ user }) => {
  // todo move to .env
  const defaultAvatar = 'https://via.placeholder.com/300x300.png?text=Avatar';
  const [images, setImages] = useState([]);

  const onChange = async imageList => {
    setImages(imageList);
    const filename = generateFileName(imageList[0].file);
    const imgUrl = await imageUpload(imageList[0].file, filename);
    await updateUserProfile(user, {profilePic: imgUrl});

    // TODO implementer toastr message
  };

  const generateFileName = file => {
    const ext = file.type.split('/');

    return user.id + '.' + ext[1];
  }

  return (
    <div className="ui grid centered">
     <ImageUploading        
        acceptType={['jpg', 'jpeg', 'png']}
        value={images}
        maxFileSize={'2,097,152'}
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
              <img alt="avatar" className="ui medium circular image" src={user.profilePic ? user.profilePic : defaultAvatar} />
              :
              null
            }            
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img className="ui medium circular image" src={image['data_url']} alt="image-upload-placeholder" style={{width: "100%"}} />
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
    </div>
  )
}

export default UserPic;