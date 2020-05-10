import React from 'react';

class ImageFrame extends React.Component {
    render(){
        return(
            <div>
                <a href={this.props.data.link} target="_blank" rel="noopener noreferrer">
                    <img src={this.props.data.image} alt="Placeholder"/>
                </a>
            </div>
        );
    }
    
    
}

export default ImageFrame;