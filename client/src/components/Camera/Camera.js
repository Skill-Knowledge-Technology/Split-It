import React, { useState } from 'react';
import Camera, {FACING_MODES} from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
 
import ImagePreview from './ImagePreview'; 
 
function Cameratake(props) {
  const [dataUri, setDataUri] = useState('');
 
  function handleTakePhotoAnimationDone (dataUri) {
    console.log('takePhoto');
    setDataUri(dataUri);
  }
 
  const isfullscreen = false;
  return (
    <div>
      {
        (dataUri)
          ? <ImagePreview dataUri={dataUri}
            isFullscreen={isfullscreen}
          />
          : <Camera onTakePhotoAnimationDone = {handleTakePhotoAnimationDone}
            isFullscreen={isfullscreen}
            isMaxResolution = {true}
            //set to max resolution
            idealFacingMode ={FACING_MODES.ENVIRONMENT}
            //ideal facing mode for the camera via mobile (rear end)
            isImageMirror = {false}
            // have the right faceing mode 
            isDisplayStartCameraError = {true}
            //displays camera error
            
          />
      }
    </div>
  );
}
 
export default Cameratake ;