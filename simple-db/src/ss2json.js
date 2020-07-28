import React from 'react'
import ClientSecret from './client_secret.json'

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

        this.clientSecret = String(JSON.stringify(ClientSecret)); 
        
        // this.goauth2Client = new googleapis.auth.OAuth2(
        //     this.ClientSecret.web.client_id, 
        //     this.ClientSecret.web.client_secret, 
        //     'https://google.com.tw'
        // ); 

        this.clientId = '624015562085-q0d6a3rgdl7554s0m875n2pbeov60v8p.apps.googleusercontent.com'; 

        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
        this.handleLoginFailure = this.handleLoginFailure.bind(this)
        this.handleLogoutFailure = this.handleLogoutFailure.bind(this)

        this.getAuthEntry = this.getAuthEntry.bind(this); 
        this.readCharacterSheet = this.readCharacterSheet.bind(this); 
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

    readCharacterSheet () {
        // fetch('https://ss2json-dot-wfchiang-dev.uc.r.appspot.com/readSheetData?sheetId=Character List&spreadsheetsId=1PnVWC9j-P8lL7EzhMKRKnSuwmf2qDE2avSLIZJYSISg', {})
        fetch('https://accounts.google.com/signin/oauth/identifier?redirect_uri=https%3A%2F%2Fdevelopers.google.com%2Foauthplayground&prompt=consent&response_type=code&client_id=407408718192.apps.googleusercontent.com&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fspreadsheets&access_type=offline&o2v=2&as=JgEyUh3Ww-9Q542PDRCUPQ&flowName=GeneralOAuthFlow', {redirect: 'follow'})
        // .then(res => {console.log(res.ok); console.log(res.statusText); return res.json();})
        // .then(
        //     (result) => {
        //         console.log(result);
        //         // alert(JSON.stringify(result, null, 2));     
        //     },
        //     (error) => {
        //         console.error(error); 
        //     }
        // );
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
                <button onClick={this.devRead0}>Read devRead0</button>
                <button onClick={this.getAuthEntry}>Try authEntry</button>

                <button onClick={()=> window.open("https://ss2json-dot-wfchiang-dev.uc.r.appspot.com/authEntry", "_blank")}>New-window authEntry</button>

                <button onClick={this.readCharacterSheet}>Read Characters</button>

                <p>isLogin: {this.state.isLogin.toString()}</p>
                <p>Access Token: [{this.state.accessToken}]</p>
                <p>Message: {this.state.message}</p>
                <pre>profileObj: {this.state.profileObj}</pre>
                <pre>tokenObj: {this.state.tokenObj}</pre>
        <pre>client secret: {this.clientSecret}</pre>
            </div>
        ); 
    }
}

export default GoogleLoginButton; 