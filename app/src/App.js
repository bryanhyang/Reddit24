import React from 'react';
import './App.css';
//import ImageFrame from './components/ImageFrame'
import SideBar from './components/SideBar'
import Gallery from 'react-photo-gallery';

class App extends React.Component {
	state = {
    	recvData : false,
		submissions : {},
		images : {},
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
				let newSubmissions = {};
				let newImages = [];
				json['submissions'].forEach(submission => {
						let tmp = {}
						tmp['src'] = submission.image
						tmp['width'] = 4
						tmp['height'] = 3
						newImages.push(tmp)
						newSubmissions[submission.image] = submission.link
						
				});
				
		  		this.setState({
					recvData: true,
					submissions: newSubmissions,
					images : newImages
				})
				console.log(newImages)
				  
			})
		  	.catch((error) => {
		   	 	console.error('Error:', error);
			});
	}

	openLink = (e, index) => {
		console.log(e)
		console.log(index)
		window.open(this.state.submissions[index.photo.src]);
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
					<Gallery photos={this.state.images} onClick = {this.openLink}/>
				</div>
    		);
  		}
	}
}
export default App;
