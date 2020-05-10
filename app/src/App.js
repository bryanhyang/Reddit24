import React from 'react';
import './App.css';
import ImageFrame from './components/ImageFrame'
class App extends React.Component {
	state = {
    	recvData : false,
    	submissions : {}
	  };
	 // this is a comment 

	componentDidMount = () => {
		this.getReddit();
	};

	getReddit = () => {
    	fetch('/today')
    	  	.then(res => res.json())
		  	.then(json => {		
		  		this.setState({
					recvData: true,
					submissions: json,
		 	 	})
			})
		  	.catch((error) => {
		   	 	console.error('Error:', error);
			  });
	}

	render(){
		var { recvData, submissions } = this.state;


		if(!recvData){
			return(
				<div className="App">
					Loading . . .
				</div>
			);

		}
		else{
    		return (  
    	  		<div className="App">
      				helloworld
					{console.log(recvData)};
					<ImageFrame submissions = {submissions}/>
				</div>
    		);
  		}
	}
}
export default App;
