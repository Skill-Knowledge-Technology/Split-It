import React from 'react';
import ImageUploader from 'react-images-upload';
 
export default class Camera extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pictures: [] };
    this.onDrop = this.onDrop.bind(this);
  }
 
  onDrop(picture) {
    this.setState({
      pictures: this.state.pictures.concat(picture),
    });
  }

  render() {
    return (
      <div>
        <ImageUploader
          withIcon={true}
          withPreview={true}
          buttonText='Choose images'
          onChange={this.onDrop}
          imgExtension={['.jpg', '.gif', '.png']}
          maxFileSize={5242880}
        />
        <div className="center-align">
          <a className="btn-large waves-effect waves-light" href="Test">
            In Testing
            <i className="material-icons right">cached</i>
          </a>
        </div>
      </div>
    );
  }
}