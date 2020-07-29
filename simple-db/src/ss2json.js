import React from 'react'
import ClientSecret from './client_secret.json'

class GoogleLoginButton extends React.Component {
    constructor(props) {
        super(props);

        this.testData = ''; 
        
        // try to store the google credentials 
        let fragmentString = location.hash.substring(1);

        let regex = /([^&=]+)=([^&]*)/g, m;
        let oauth2Params = {}; 
        while (m = regex.exec(fragmentString)) {
            let para_k = decodeURIComponent(m[1]); 
            let para_v = decodeURIComponent(m[2]); 
            oauth2Params[para_k] = para_v; 
            console.info('para[' + para_k + '] = [' + para_v + ']'); 
        }
        if (oauth2Params['state'] && oauth2Params['state'] == 'callback') {
            for (let k in oauth2Params) {
                localStorage.setItem(k, oauth2Params[k]); 
            } 
            // localStorage.setItem('oauth2-params', JSON.stringify(oauth2Params)); 
        }

        // bind class function 
        this.authLogin = this.authLogin.bind(this); 
        this.testRead = this.testRead.bind(this); 
    }

    authLogin() {
        let loginForm = document.createElement('form');
        loginForm.setAttribute('method', 'GET'); 
        loginForm.setAttribute('action', ClientSecret.web.auth_uri);

        let redirect_uri = 'https://ss2json-simple-db-dot-wfchiang-dev.uc.r.appspot.com'; 

        let params = {'client_id': ClientSecret.web.client_id,
                  'redirect_uri': redirect_uri,
                  'scope': 'https://www.googleapis.com/auth/spreadsheets',
                  'state': 'callback', 
                  'include_granted_scopes': 'true',
                  'response_type': 'token'};

        for (let p in params) {
            let input = document.createElement('input');
            input.setAttribute('type', 'hidden');
            input.setAttribute('name', p);
            input.setAttribute('value', params[p]);
            loginForm.appendChild(input);
        }

        document.body.appendChild(loginForm);
        loginForm.submit(); 
    }

    testRead() {
        if (localStorage.getItem('token_type') && localStorage.getItem('access_token')) {
            let authToken = localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token');
            let spreadsheetId = '1PnVWC9j-P8lL7EzhMKRKnSuwmf2qDE2avSLIZJYSISg';
            let dataRange = 'sheet0!A1:D5';   
            let url = 'https://sheets.googleapis.com/v4/spreadsheets/' + encodeURIComponent(spreadsheetId) + '/values/' + encodeURIComponent(dataRange); 
            fetch(url, {
                method: 'GET', 
                headers: {
                    'Authorization': authToken
                }
            })
            .then(res => res.json())
            .then(function(res){
                console.info('>> here uuuu go ' + JSON.stringify(res)); 
                this.setTestData(JSON.stringify(res)); 
            }); 
        }
        else {
            this.setTestData('No Token...'); 
        }
    }
    
    render() {
        return (
            <div>
                <button onClick={this.authLogin}>Auth Login</button>
                <button onClick={this.testRead}>Test Read</button>
                <pre>Test Data [{this.testData}]</pre>
            </div>
        ); 
    }
}

export default GoogleLoginButton; 