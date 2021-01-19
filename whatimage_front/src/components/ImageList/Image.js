import React from 'react';

const Image = (props) => {
    return (
        <div className="card-image" >
            <div className="image" style={{ backgroundImage: `url(${props.pic})` }}></div>
            <div>Classified as: {props.name}</div>
        </div>
    );
}

export default Image;