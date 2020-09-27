import React from 'react'
import SpreadsheetTable from './SpreadsheetTable'
import ClientSecret from './client_secret.json'
import { isUndefined, isString, isObject, isArray} from './wfJsUtils'

import './index.css'

class SS2Json extends React.Component {
    constructor(props) {
        super(props);
        
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

        // Initialize state 
        this.state = {
            userInfo: undefined, 
            spreadsheetInfo: {
                spreadsheetId: '1PnVWC9j-P8lL7EzhMKRKnSuwmf2qDE2avSLIZJYSISg', 
                sheetId: 'sheet0'
            }, 
            activeData: {}, 
            backupData: {}
        };
        
        // bind class function 
        this.isLogin = this.isLogin.bind(this); 
        this.authLogin = this.authLogin.bind(this); 
        this.authLogout = this.authLogout.bind(this); 
        this.readSpreadsheet = this.readSpreadsheet.bind(this); 
        this.makeGetParams = this.makeGetParams.bind(this); 
        this.makeGetRequest = this.makeGetRequest.bind(this); 
        this.callbackLoadUserInfo = this.callbackLoadUserInfo.bind(this); 
        this.callbackLoadTableData = this.callbackLoadTableData.bind(this);    
        this.renderUserInfo = this.renderUserInfo.bind(this);    
        this.renderTableInfo = this.renderTableInfo.bind(this);   
        this.handleOnChangeTextBox = this.handleOnChangeTextBox.bind(this); 
    }
    
    componentDidMount () {
        // try to get the userInfo 
        if (this.isLogin()) {
            let api = 'https://www.googleapis.com/oauth2/v2/userinfo'; 
            let headers = {
                'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
            };
            let params = {}; 
            this.makeGetRequest(api, headers, params, this.callbackLoadUserInfo);
        }
    }

    isLogin () {
        return (isString(localStorage.getItem('token_type')) && isString(localStorage.getItem('access_token'))); 
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

    authLogout () {
        localStorage.removeItem('token_type'); 
        localStorage.removeItem('access_token'); 
        this.setState({
            userInfo: undefined, 
            spreadsheetInfo: {
                spreadsheetId: '', 
                sheetId: ''
            }, 
            activeData: {}, 
            backupData: {}
        });
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

    callbackLoadUserInfo (reactComp, xhr) {
        return function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.debug(' xhr.response for userInfo > ' + xhr.response);
                reactComp.setState({
                    userInfo: JSON.parse(xhr.response), 
                    spreadsheetInfo: reactComp.state.spreadsheetInfo, 
                    activeData: reactComp.state.activeData,  
                    backupData: reactComp.state.backupData
                });
                console.debug(JSON.stringify(reactComp.state)); 
            } 
            else { 
                console.debug(' xhr state-status for userInfo > ' + xhr.readyState + '-' + xhr.status); 
            }
        }; 
    }

    callbackLoadTableData (reactComp, xhr) {
        return function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.debug(' xhr.response for tableData > ' + xhr.response);
                reactComp.setState({
                    userInfo: reactComp.state.userInfo, 
                    spreadsheetInfo: reactComp.state.spreadsheetInfo, 
                    activeData: JSON.parse(xhr.response), 
                    backupData: JSON.parse(xhr.response)
                });
                console.debug(JSON.stringify(reactComp.state)); 
            } 
            else { 
                console.debug(' xhr state-status for tableData > ' + xhr.readyState + '-' + xhr.status); 
            }   
        };  
    }

    makeGetRequest (api, headers, params, callback) {
        let url = api + '?' + this.makeGetParams(params); 
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        for (let hk in headers) {
            xhr.setRequestHeader(hk, headers[hk]); 
        } 
        xhr.onreadystatechange = callback(this, xhr); 
        xhr.send(null);
    } 

    readSpreadsheet() {
        if (localStorage.getItem('token_type') && localStorage.getItem('access_token')) {     
            let api = 'https://ss2json-dot-wfchiang-dev.uc.r.appspot.com/readSheetData'; 
            let headers = {
                'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
            };
            let params = {
                'spreadsheetId': this.state.spreadsheetInfo.spreadsheetId,
                'sheetId': this.state.spreadsheetInfo.sheetId
            }; 
            this.makeGetRequest(api, headers, params, this.callbackLoadTableData); 
        }
        else {
            console.debug('No token... cannot read the spreadsheet');
        }
    }

    renderUserInfo () {
        if (this.isLogin()) {
            if (isUndefined(this.state.userInfo) || isUndefined(this.state.userInfo.given_name)) {
                return (<button onClick={this.authLogin}>UserInfo Corrupted -- Google Login</button>); 
            }
            else {
                return (
                    <div>
                        <p>Hi, {this.state.userInfo.given_name}</p>
                        <button onClick={this.authLogout}>Logout</button>
                    </div>
                );
            } 
        }
        else {
            return (<button onClick={this.authLogin}>Google Login</button>); 
        }
    }

    renderTableInfo () {
        if (true || this.isLogin()) {
            return (
                <div>
                    <p>
                        Spreadsheet ID: 
                        <input 
                            id="input-spreadsheet-id" 
                            type="text" 
                            value={this.state.spreadsheetInfo.spreadsheetId}
                            onChange={this.handleOnChangeTextBox} />
                    </p>
                    <p>
                        Sheet ID: 
                        <input 
                            id="input-sheet-id"
                            type="text" 
                            value={this.state.spreadsheetInfo.sheetId}
                            onChange={this.handleOnChangeTextBox} />
                    </p>
                    <button onClick={this.readSpreadsheet}>Test Read</button>
                </div>
            ); 
        }
        else {
            return (<div></div>); 
        }
    }

    handleOnChangeTextBox(event) {
        let id_elem = event.target.id; 
        let val_elem = event.target.value; 
        
        if (id_elem == 'input-spreadsheet-id') {
            this.setState({
                userInfo: this.state.userInfo, 
                spreadsheetInfo: {
                    spreadsheetId: val_elem, 
                    sheetId: this.state.spreadsheetInfo.sheetId, 
                }, 
                activeData: this.state.activeData, 
                backupData: this.state.backupData 
            });
        }
        else if (id_elem == 'input-sheet-id') {
            this.setState({
                userInfo: this.setState.userInfo, 
                spreadsheetInfo: {
                    spreadsheetId: this.state.spreadsheetInfo.spreadsheetId, 
                    sheetId: val_elem 
                }, 
                activeData: this.state.activeData, 
                backupData: this.state.backupData 
            }); 
        }
        else {
            console.error('Unhandled element: ' + String(id_elem)); 
        }
    }
    
    render() {
        return (
            <div>
                <p>v12</p>
                <div>
                    <this.renderUserInfo />
                </div>
                <div>
                    <this.renderTableInfo />
                </div>
                <h2>Spreadsheet Table</h2>
                {(isObject(this.state.activeData) && isArray(this.state.activeData.columnTitles) && isArray(this.state.activeData.rows)) &&
                    <SpreadsheetTable 
                        activeData={this.state.activeData} 
                        backupData={this.state.backupData} />
                }
            </div>
        ); 
    }
}

export default SS2Json; 