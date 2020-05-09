import React from 'react';
import './App.css';
import Img from 'react-image'
import {
  BrowserRouter as Router,
    Switch,
	  Route,
	    Link
		} from "react-router-dom";

class App extends React.Component {
	//probably integrate this into a class to modulize 
  	state = {
    	isLoaded: false,
    	submissions: {}
  	};

	componentDidMount = () => {
		this.getReddit();
	};

	getReddit = () => {
    	fetch('/date/2020-05-07')
    	  	.then(res => res.json())
		  	.then(json => {
				
		  		this.setState({
					isLoaded: true,
					submissions: json,
		 	 	})
			})
		  	.catch((error) => {
		   	 	console.error('Error:', error);
		  	});
	}

	render(){
		var { isLoaded, submissions } = this.state;

		if(!isLoaded){
			return(
				<div className="App">
					no input
				</div>
			);

		}
		else{
    		return (  
    	  		<div className="App">
      				helloworld
					{console.log(isLoaded)};
					
						
						{submissions.submissions.map(submission => (
							<a href={submission.link} target="_blank">

								<img src={submission.image}/>
							</a>
						))};
						
				 </div>
    		);
  		}
	}

}

export default App;
