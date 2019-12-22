import React, { Component } from 'react';
import './TopGuildsMonth.css';

import PieChart from '../../Charts/PieChart/PieChart';
import services from '../../../services/apiServices';


class TopGuildsMonth extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this._isMounted = true;
        this.getLogs();
    }

    getLogs() {
        if(!this._isMounted) return setTimeout(() => this.getLogs(), 2000);
        services.getTopGuildsMonth()
        .then(logs => this.setState({ logs: logs.data.data, dataReceived: true }))
        .catch(err => console.error(err));
    }

    renderChart() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', ' August', 'September', 'October', 'November', 'December'];
        const today = new Date();
        const date = { day: today.getDate(), month: today.getMonth(), year: today.getFullYear() };
        
        let logsThisMonth = this.state.logs;

        let data = {
            labels: logsThisMonth.map(el => el.guild_name),
            datasets: [{
                data: logsThisMonth.map(el => el.commandUses),
                backgroundColor: logsThisMonth.map((el, idx) => {
                    if(idx === 0)
                        return "#FF5005";
                    else if(idx === 1)
                        return "#00B39A";
                    else if(idx === 2)
                        return "#CC8218";
                    else return null;
                }).filter(Boolean)
            }]
        };

        return <PieChart data={data} options={{ height: 100, title: `Top Guilds For ${months[date.month]}` }} />
    }

    render() {
        return(
            <div id="TopGuildsMonth">
            {this.state.logs ? this.renderChart() : ''}
            </div>
        );
    }
};

export default TopGuildsMonth;