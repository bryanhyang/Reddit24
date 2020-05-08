import React from 'react';
import './App.css';

class App extends React.Component {
	//probably integrate this into a class to modulize 
  	state = {
    	isLoaded: false,
    	submissions: []
  	};

	componentDidMount = () => {
		this.getReddit();
	};

	getReddit = () => {
    	fetch('https://reddit24.com/')
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
    	return (  
    	  <div className="App">
      			helloworld
				{console.log(this.state.isLoaded)}
    	  </div>
    	);
  	}

}


export default App;
