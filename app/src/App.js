import React from 'react';
import './App.css';
import ImageFrame from './components/ImageFrame'
import SideBar from './components/SideBar'
class App extends React.Component {
	state = {
    	recvData : false,
		submissions : {},
		date : new Date()
	};
	 // this is a comment 

	componentDidMount = () => {
		this.getReddit();
	};

	getReddit = (suffix='/today') => {
		//may be a more efficient way to reset recvData
		this.setState ({
			recvData : false
		});
    	fetch(suffix)
    	  	.then(res => res.json())
		  	.then(json => {		
				console.log(json);
		  		this.setState({
					recvData: true,
					submissions: json,
		 	 	})
			})
		  	.catch((error) => {
		   	 	console.error('Error:', error);
			  });
	}

	newDate = (date) => {
		let past = '/date/' + date.toJSON().slice(0,10);
		console.log(past)
		this.getReddit(past);
	}

	render(){
		let { recvData, submissions } = this.state;


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
					<SideBar newDate = {this.newDate} date = {this.state.date}/>
					<ImageFrame submissions = {submissions}/>
				</div>
    		);
  		}
	}
}
export default App;
