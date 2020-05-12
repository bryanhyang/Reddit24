import React from 'react';
import './App.css';
import Gallery from 'react-photo-gallery';
import Calendar from 'react-calendar';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-calendar/dist/Calendar.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.handleLoginClick = this.handleCalendarClick.bind(this);
		this.getReddit = this.getReddit.bind(this);
		this.newDate = this.newDate.bind(this);
		this.state = {
			recvData: false,
			submissions: {},
			images: {},
			date: new Date(),
			showCalendar: true
		};
	}


	componentDidMount = () => {
		this.getReddit();
	};

	getReddit = (suffix = '/today') => {
		//may be a more efficient way to reset recvData
		this.setState({
			recvData: false
		});
		fetch(suffix)
			.then(res => res.json())
			.then(json => {
				let newSubmissions = {};
				let newImages = [];
				json['submissions'].forEach(submission => {
					let tmp = {}
					tmp['src'] = submission.image
					tmp['width'] = 1
					tmp['height'] = submission.ratio
					newImages.push(tmp)
					newSubmissions[submission.image] = submission.link

				});

				this.setState({
					recvData: true,
					submissions: newSubmissions,
					images: newImages
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
		let past = '/date/' + date.toJSON().slice(0, 10);
		console.log(past)
		this.getReddit(past);
		this.setState({date})
	}



	handleCalendarClick = () => {
		this.setState((state) => ({ dispCalendar: !state.dispCalendar }));
	}





	render() {

		let calendar = <Calendar onChange={this.newDate} value={this.state.date}/>
		if (!this.state.showCalendar) {
			calendar = null
		}

		if (!this.state.recvData) {
			return (
				<div className="App">
					Loading . . .
				</div>
			);

		}
		else {
			return (
				<div className="App">
					<Navbar bg="primary">
						<Button variant="primary" onClick={() => this.setState({showCalendar: !this.state.showCalendar})}>
							{this.state.showCalendar ? 'Hide Calendar' : 'Show Calendar'}
						</Button>
						Welcome to Reddit24
					</Navbar>
					<Container fluid >
						<Row>
							<Col md="auto">
								{calendar}
							</Col>
							<Col>
								<Gallery photos={this.state.images} onClick={this.openLink} />
							</Col>
						</Row>
					</Container>
				</div>
			);
		}
	}
}
export default App;
