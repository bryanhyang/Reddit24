import React from 'react'
import Calendar from 'react-calendar';

class SideBar extends React.Component {
    onChange = date => this.props.newDate(date)
    render(){
        return(
            <div>
                <Calendar
                    onChange={this.onChange}
                    value={this.props.date}
                />
            </div>
        )
    }
}

export default SideBar