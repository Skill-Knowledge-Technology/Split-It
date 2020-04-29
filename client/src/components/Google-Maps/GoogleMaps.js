import React from 'react';
import { Map, InfoWindow, GoogleApiWrapper, Marker } from 'google-maps-react';


export class GoogleMaps extends React.Component {
  //Runs when component mounts
    componentDidMount() {
      this.getUserLocation();
    }

  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      currentLocation: {
        lat: 40.7831,
        lng: -73.9712
      },
      width: props.width,
      height: props.height,
    }
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

  displayMarkers = () => {
    return this.props.markers.map((transactions, index) => {
      return <Marker key={index} id={index}
        position={{
          lat: transactions.latitude,
          lng: transactions.longitude
         }}
      onClick={this.onMarkerClick} 
      transactionID = {transactions.transactionID}
      date = {transactions.createdAt}
      address = {transactions.address}
      />
    })
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  render() {
    const mapStyles = {
      container: {
        position: 'absolute',
        top: '110px',
        left: '0px',
        width: this.state.width,
        height: this.state.height,
      },
    };

    return (
      <div>
        <Map
          google={this.props.google} // Google Maps
          containerStyle={mapStyles.container} // Sizing of Map
          zoom={13} // How Far We Zoom For Google Map
          initialCenter={this.state.currentLocation}
          centerAroundCurrentLocation
        >
        {this.displayCurrentLocation()}
        {this.displayMarkers()}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
              <div>
                <p><b>TransactionID: </b>{this.state.selectedPlace.transactionID}</p>
                <hr/>
                <p><b>Date: </b>{this.state.selectedPlace.date}</p>
                <hr/>
                <p><b>Location: </b>{this.state.selectedPlace.address}</p>
                <hr/>
                {this.state.selectedPlace.position ? <p><b><a href={`https://www.google.com/maps/dir/?api=1&origin=${this.state.currentLocation.lat}, ${this.state.currentLocation.lng}&destination=${this.state.selectedPlace.position.lat},${this.state.selectedPlace.position.lng}&travelmode=transit`} target="_blank">Get Directions</a></b></p>: <div></div>}
              </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY
})(GoogleMaps);
