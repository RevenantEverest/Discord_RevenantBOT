import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AnimatedNumber from 'react-animated-number';
import './HomePage.css';

//Image Imports
import Logo from '../../res/images/Logo.png'

//services Imports
import discordServices from '../../services/discordServices';
import loginServies from '../../services/loginServices';

import env from '../../env';

class HomePage extends Component {

  DiscordRedirect = `https://discordapp.com/api/oauth2/authorize?client_id=${env.CLIENT_ID}&redirect_uri=${env.REDIRECT}&response_type=code&scope=guilds%20identify%20guilds.join%20email%20messages.read`;
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,
      isLoggedIn: false,
      apiData: null,
      dataRecieved: false
    }
  }

  componentDidMount() {
    this._isMounted = true;
    document.querySelector('.NavBar').style.display = "none";
    if(window.location.search) this.getToken();
    this.getDiscordBotUsers();
  }

  componentWillUnmount() { this._isMounted = false; }

  getToken() {
    let code = window.location.search.split("code=")[1];
    loginServies.handleLogin(code)
      .then(results => {
        window.localStorage.setItem('id', results.data.data.userData.discord_id);
        this.setState({ dataRecieved: true }, () => this.props.getUserData(results.data.data.userData));
      }).catch(err => console.log(err));
  }

  getDiscordBotUsers() {
    if(this._isMounted === false) return;
    discordServices.getDiscordUserSize()
      .then(users => {
        this.setState({ usersCount: users.data.data, botInfoDataRecieved: true }, () => {
          setTimeout(() => {
            this.getDiscordBotUsers()
          }, 5000);
        });
      })
  }

  login() {
    this.setState({ isLoggedIn: true });
  }

  renderUserCount() {
    return(
      <div className="HomePage-ServerList-Container">
        <AnimatedNumber
            className="HomePage-ServerList"
            component="span"
            style={{
              transition: '0.1s ease out',
              transitionProperty: 'background-color, color, opacity'
            }}
            stepPrecision={0}
            duration={1000}
            value={this.state.usersCount}
            formatValue={n => 'Serving ' + n.toLocaleString('en') + ' Users'}
          />
      </div>
    );
  }

  renderDiscordLogin() {
    if(window.localStorage.id) {
      return(
        <button id="Discord-Login" onClick={(e) => this.login()}>
          <FontAwesomeIcon className="HomePage-DiscordIcon" icon={['fab', 'discord']} />
          <p className="Discord-Login-Text">Login With Discord</p>
        </button>
      );
    }else {
      return(
        <a id="Discord-Login" href={`${this.DiscordRedirect}`}>
          <FontAwesomeIcon className="HomePage-DiscordIcon" icon={['fab', 'discord']} />
          <p className="Discord-Login-Text">Login With Discord</p>
        </a>
      );
    }
  }

  render() {
    return(
      <div className="HomePage">
        <div className="HomePage-Contents">
          <div className="HomePage-Box1">
            <div className="HomePage-Box1-Vignette">
              <div className="HomePage-Box1-Contents">
                <img className="Logo" src={Logo} alt=""/>
                <h1 className="Text-Logo">FiresideBOT</h1>
                {this.renderDiscordLogin()}
                {this.state.botInfoDataRecieved ? this.renderUserCount() : ''}
                {this.state.dataRecieved ? <Redirect to="/dashboard" /> : ''}
                {this.state.isLoggedIn ? <Redirect to="/dashboard" /> : ''}
              </div>
            </div>
          </div>

          <div className="HomePage-Box2">
            <h1 className="HomePage-Features-Header-Text">Features</h1>
            <div className="HomePage-Features">
              <div className="HomePage-Music">
                <FontAwesomeIcon className="HomePage-MusicIcon" icon="music" />
                <p className="HomePage-Music-Text HomePage-Features-Text">
                  Not your average music features. We offer you the ability to not only request songs but to create and request your own playlists. Have full control over your music by pausing when you like, changing serverwide volume and more!
                </p>
              </div>
              <div className="HomePage-Headphones">
                <FontAwesomeIcon className="HomePage-HeadphonesIcon" icon="headphones" />
                <p className="HomePage-Headphones-Text HomePage-Features-Text">
                  Enjoy a handsfree listening experience with our Auto DJ system. AutoDJ allows you to play your created playlists just like a live stream. Take full control of your experience by adjusting volume, and seeking to specific points in your music.
                </p>
              </div>
              <div className="HomePage-Currency">
                <FontAwesomeIcon className="HomePage-CoinsIcon" icon="coins" />
                <p className="HomePage-Currency-Text HomePage-Features-Text">
                  Fully customizable server currency system. Customize your currency name, and adjust increase rate. Allow your server memebers to gain and trade points based on how active they are.
                </p>
              </div>
              <div className="HomePage-BoxOpen">
                <FontAwesomeIcon className="HomePage-BoxOpenIcon" icon="box-open" />
                <p className="HomePage-BoxOpen-Text HomePage-Features-Text">
                  Enjoy our other fun commands. Display or get info about Pokemon, ask FiresideBOT a question with 8ball, or listen to a soothing campfire!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default HomePage;