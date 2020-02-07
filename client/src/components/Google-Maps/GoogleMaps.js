import React from 'react';
import { Map, InfoWindow, GoogleApiWrapper, Marker } from 'google-maps-react';


export class GoogleMaps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        currentLocation: {
          lat: 40.7831,
          lng: -73.9712
        },
        width: props.width,
        height: props.height,
    }
  }

  //Runs when component mounts
  componentDidMount() {
    this.getUserLocation();
  }

  displayCurrentLocation = () => {
    return <Marker name="My Location"
      position={{
        lat: this.state.currentLocation.lat,
        lng: this.state.currentLocation.lng
      }} 
    />
  }
  
  //Gets the lat and long of the user location
  getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const coord = pos.coords;
        const lat = coord.latitude;
        const lng = coord.longitude;
        this.setState({
          currentLocation: {lat,lng}
        })
      })
    }
  }

  render() {
    return (
      <div>
        <Map
          google={this.props.google} // Google Maps
          style={{width: this.state.width, height: this.state.height}} // Sizing of Map
          zoom={13} // How Far We Zoom For Google Map
          initialCenter={this.state.currentLocation}
          centerAroundCurrentLocation
        >
        {this.displayCurrentLocation()}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY
})(GoogleMaps);
