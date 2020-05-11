import React from 'react';
import './App.css';
import Gallery from 'react-photo-gallery';
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Navbar from 'react-bootstrap/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-calendar/dist/Calendar.css';


class App extends React.Component {
	state = {
		recvData: false,
		submissions: {},
		images: {},
		date: new Date()
	};
	// this is a comment 

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
					tmp['width'] = 4
					tmp['height'] = 3
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
	}

	render() {
		let { recvData, submissions } = this.state;


		if (!recvData) {
			return (
				<div className="App">
					Loading . . .
				</div>
			);

		}
		else {
			return (
				<div className="App">
					{console.log(recvData)};
					<Container fluid>
						<Navbar variant="white" bg="dark"> Hello
						</Navbar>
						<Row>
							<Col md="auto">
								<Calendar> onChange={this.newDate} value={this.state.date} </Calendar>
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
