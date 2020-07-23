import React from 'react'
// import { Redirect } from 'react-router-dom'

class GoogleLoginButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false, 
            accessToken: '', 
            message: '<init>', 
            profileObj: '', 
            tokenObj: ''
        };

        this.clientId = '624015562085-q0d6a3rgdl7554s0m875n2pbeov60v8p.apps.googleusercontent.com'; 

        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
        this.handleLoginFailure = this.handleLoginFailure.bind(this)
        this.handleLogoutFailure = this.handleLogoutFailure.bind(this)
    }

    login(response) {
        console.log(response); 
        console.log(response.tokenObj);
        if (response.hasOwnProperty('profileObj') && response.hasOwnProperty('tokenObj')) {
            this.setState({
                isLogin: true, 
                accessToken: response.tokenObj.access_token, 
                message: 'Login Successfully!', 
                profileObj: JSON.stringify(response.profileObj, null, 4), 
                tokenObj: JSON.stringify(response.tokenObj, null, 4) 
            });
        }
        else {
            this.setState({
                isLogin: false, 
                accessToken: '', 
                message: 'No response token', 
                profileObj: '', 
                tokenObj: ''
            }); 
        }
    }

    logout(response) {
        this.setState({
            isLogin: false, 
            accessToken: '', 
            message: 'Logout!', 
            profileObj: '', 
            tokenObj: ''
        }); 
    }

    handleLoginFailure(response) {
        this.setState({
            isLogin: this.state.isLogin, 
            accessToken: this.state.accessToken, 
            message: 'Login Failed', 
            profileObj: '', 
            tokenObj: ''
        }); 
        alert(response.message); 
        alert('Failed to Login to Google'); 
    }

    handleLogoutFailure(response) {
        this.setState({
            isLogin: this.state.isLogin, 
            accessToken: this.state.accessToken, 
            message: 'Logout Failed', 
            profileObj: '', 
            tokenObj: ''
        });
        alert('Failed to Logout from Google'); 
    }

    getAuthEntry () {
        fetch('https://ss2json-dot-wfchiang-dev.uc.r.appspot.com/authEntry', {redirect:'follow'})
        .then(res => {console.log(res.ok); console.log(res.statusText); return res.json();})
        .then(
            (result) => {
                console.log(result);
                // alert(JSON.stringify(result, null, 2));     
            },
            (error) => {
                console.error(error); 
            }
        ); 
    }

    devRead0 () {
        fetch('https://ss2json-dot-wfchiang-dev.uc.r.appspot.com/devRead0')
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result); 
            }, 
            (error) => {
                console.error(error); 
            }
        ); 
    }

    render() {
        return (
            <div>
                {this.showRedirect ? <button>here</button> : <button>there</button>}
                <button onClick={this.devRead0}>add-redirect</button>
                <button onClick={this.getAuthEntry}>Try</button>

                <p>isLogin: {this.state.isLogin.toString()}</p>
                <p>Access Token: [{this.state.accessToken}]</p>
                <p>Message: {this.state.message}</p>
                <pre>profileObj: {this.state.profileObj}</pre>
                <pre>tokenObj: {this.state.tokenObj}</pre>
            </div>
        ); 
    }
}

export default GoogleLoginButton; 