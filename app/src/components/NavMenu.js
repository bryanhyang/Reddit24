import React from 'react'
import Calendar from 'react-calendar';
import Sidebar from "react-sidebar";

const mql = window.matchMedia(`(min-width: 800px)`);

class NavMenu extends React.Component {
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

    onChange = date => this.props.newDate(date)

    render() {
        return (
            <Sidebar
                sidebar={
                    <Calendar
                        onChange={this.onChange}
                        value={this.props.date}
                    />}
                open={this.state.sidebarOpen}
                docked={this.state.sidebarDocked}
                onSetOpen={this.onSetSidebarOpen}
            >
            </Sidebar>
        )
    }
}

export default NavMenu