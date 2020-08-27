import React from 'react'
import SpreadsheetTable from './SpreadsheetTable'
import ClientSecret from './client_secret.json'

class GoogleLoginButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeData: {}, 
            backupData: {}
        }; 
        
        // try to store the google credentials 
        let fragmentString = location.hash.substring(1);

        let regex = /([^&=]+)=([^&]*)/g, m;
        let oauth2Params = {}; 
        while (m = regex.exec(fragmentString)) {
            let para_k = decodeURIComponent(m[1]); 
            let para_v = decodeURIComponent(m[2]); 
            oauth2Params[para_k] = para_v; 
            console.debug('para[' + para_k + '] = [' + para_v + ']'); 
        }
        if (oauth2Params['state'] && oauth2Params['state'] == 'callback') {
            for (let k in oauth2Params) {
                localStorage.setItem(k, oauth2Params[k]); 
            } 
            // localStorage.setItem('oauth2-params', JSON.stringify(oauth2Params)); 
        }

        // bind class function 
        this.authLogin = this.authLogin.bind(this); 
        this.readSpreadsheet = this.readSpreadsheet.bind(this); 
        this.makeGetParams = this.makeGetParams.bind(this); 
        this.isUndefined = this.isUndefined.bind(this); 
        this.isObject = this.isObject.bind(this); 
        this.isArray = this.isArray.bind(this); 

        // to be removed
        this.testTableId = {"spreadsheetId": "abcxyz123", "sheetId": "123456" }; 
        this.testTableColTitltes = ["COL-1", "COL-2"]; 
        this.testTableActiveRows = [{"rowIndex": "101", "data": {"COL-1": "123", "COL-2": "456"}}, {"rowIndex": "102", "data": {"COL-1": "111", "COL-2": "222"}}];
        this.testTableBackupRows = [{"rowIndex": "101", "data": {"COL-1": "123", "COL-2": "456"}}, {"rowIndex": "102", "data": {"COL-1": "111", "COL-2": "222"}}];
        this.testTableActive = { "id": this.testTableId, "columnTitles": this.testTableColTitltes, "rows": this.testTableActiveRows }; 
        this.testTableBackup = { "id": this.testTableId, "columnTitles": this.testTableColTitltes, "rows": this.testTableBackupRows }; 
    }

    isUndefined(v) {
        return (typeof v === 'undefined'); 
    }
    
    isObject(v) {
        return ((typeof v === 'object') && (v.constructor === Object));
    }
    
    isArray(v) {
        return ((typeof v === 'object') && (v.constructor === Array)); 
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

    makeGetParams (getParams) { 
        let paramString = ''; 
        let paramKeys = Object.getOwnPropertyNames(getParams); 
        if (paramKeys.length == 0) {
            return paramString; 
        }
        paramString = paramKeys[0] + '=' + encodeURIComponent(getParams[paramKeys[0]]); 
        if (paramKeys.length > 1) {
            for (let i = 1 ; i < paramKeys.length ; i++) {
                paramString = paramString + '&' + paramKeys[i] + '=' + encodeURIComponent(getParams[paramKeys[i]]); 
            }    
        }
        return paramString; 
    }

    readSpreadsheet() {
        if (localStorage.getItem('token_type') && localStorage.getItem('access_token')) {
            let getParams = {}; 
            getParams['spreadsheetId'] = '1PnVWC9j-P8lL7EzhMKRKnSuwmf2qDE2avSLIZJYSISg';
            getParams['sheetId'] = 'sheet0'; 
            let url = 'https://ss2json-dot-wfchiang-dev.uc.r.appspot.com/readSheetData?' + this.makeGetParams(getParams); 
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url); 
            xhr.setRequestHeader('Authorization', localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')); 
            xhr.onreadystatechange = function (e) {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    console.debug(' xhr.response > ' + xhr.response);
                    this.setState({
                        activeData: JSON.parse(xhr.response), 
                        backupData: JSON.parse(xhr.response)
                    }); 
                } else { 
                    console.debug(' xhr state-status > ' + xhr.readyState + '-' + xhr.status); 
                }
            }.bind(this);
            xhr.send(null);
        }
        else {
            console.debug('No token... cannot read the spreadsheet');
        }
    }
    
    render() {
        return (
            <div>
                <button onClick={this.authLogin}>Auth Login</button>
                <button onClick={this.readSpreadsheet}>Test Read</button>
                <h2>Spreadsheet Table</h2>
                {(this.isObject(this.state.activeData) && this.isArray(this.state.activeData.columnTitles) && this.isArray(this.state.activeData.rows)) &&
                    <SpreadsheetTable 
                        activeData={this.state.activeData} 
                        backupData={this.state.backupData} />
                }

                <SpreadsheetTable 
                    activeData={this.testTableActive}
                    backupData={this.testTableBackup} />
            </div>
        ); 
    }
}

export default GoogleLoginButton; 