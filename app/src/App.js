import React from 'react';
import logo from './peppa.ico';
import './App.css';

class App extends React.Component {

  	state = {
    	title: '',
    	body: '',
    	posts: []
  	};

/*
	getBlogPost = () => {
    	axios.get('/api')
    	  .then((response) => {
    	    const data = response.data;
    	    this.setState({ posts: data });
    	    console.log('Data has been received!!');
    	  })
    	  .catch(() => {
    	  	 alert('Error retrieving data!!!');
    	  });
	}
*/
	render(){
    	return (  
    	  <div className="App">
      			<h>helloworld</h>
    	  </div>
    	);
  	}

}


export default App;
