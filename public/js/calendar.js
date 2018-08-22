// import React, { Component } from 'react';
'use strict';
import Calendar from 'react-calendar';

const e = React.createElement;

class CreatePhase extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() };
        onChange = date => this.setState({ date })
    }

    

    render() {
        return (
            <Calendar
                onChange={this.onChange}
                value={this.state.date}
            />
        );
    }
}

const domContainer = document.querySelector('#calendar');
ReactDOM.render(e(CreatePhase), domContainer);
