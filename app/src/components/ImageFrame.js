import React from 'react';

class ImageFrame extends React.Component {
    state = {
    	recvData : false,
    	submissions : {}
    };
      
    componentDidMount = () => {
		this.props.submissions.submissions.map(submission => (
            createImage(submission)
        ))
	};
    
    createImage = () => {
        



    }

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