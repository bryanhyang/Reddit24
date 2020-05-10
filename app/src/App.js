import React from 'react';
import './App.css';
//import ImageFrame from './components/ImageFrame'
import Gallery from 'react-photo-gallery';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Sidebar from "react-sidebar"

const mql = window.matchMedia(`(min-width: 720px)`);

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

	newDate = (date) => {
		let past = '/date/' + date.toJSON().slice(0,10);
		console.log(past)
		this.getReddit(past);
	}
	constructor(props) {
		super(props);
		this.state = {
			sidebarDocked: mql.matches,
			sidebarOpen: false
		};

		this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
		this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
	}
	componentWillMount() {
        mql.addListener(this.mediaQueryChanged);
    }

    componentWillUnmount() {
        this.state.mql.removeListener(this.mediaQueryChanged);
    }

    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
    }

    mediaQueryChanged() {
        this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
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
					<Sidebar
						sidebar={
							<Calendar
								onChange={this.newDate}
								value={this.state.date}
							/>}
						open={this.state.sidebarOpen}
						docked={this.state.sidebarDocked}
						onSetOpen={this.onSetSidebarOpen}
						styles={{ sidebar: { background: "white" } }}
					>
					<Gallery photos={this.state.images} />
					</Sidebar>
				</div>
    		);
  		}
	}
}
export default App;
