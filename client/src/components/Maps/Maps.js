import React from 'react';
import GoogleMaps from '../Google-Maps/GoogleMaps';

class Maps extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="container-fluid text-center">
                <div className="row">
                    <GoogleMaps width={'100%'} height={'100%'}/>
                </div>
            </div>
        );
    }
}

export default Maps;
