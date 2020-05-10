import React from 'react';

class ImageFrame extends React.Component {


    render(){
        return(
            <div>
                {this.props.submissions.submissions.map(submission => (
                    <a href={submission.link} target="_blank" rel="noopener noreferrer">
                        <img src={submission.image} alt="Placeholder"/>
                    </a>
                ))};
            </div>
        );
    }
    
    
}

export default ImageFrame;