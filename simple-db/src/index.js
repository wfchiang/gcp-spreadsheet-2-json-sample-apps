import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SS2Json from './ss2json';
import SpreadsheetTable from './SpreadsheetTable';

ReactDOM.render(
  <React.StrictMode>
    <SS2Json />
  </React.StrictMode>, 
  document.getElementById('login-button')
); 

// to be removed -- just for testing 
let testTableId = {"spreadsheetId": "abcxyz123", "sheetId": "123456" }; 
let testTableColTitltes = ["COL-1", "COL-2"]; 
let testTableActiveRows = [{"rowIndex": "101", "data": {"COL-1": "123", "COL-2": "456"}}, {"rowIndex": "102", "data": {"COL-1": "111", "COL-2": "222"}}];
let testTableBackupRows = [{"rowIndex": "101", "data": {"COL-1": "123", "COL-2": "456"}}, {"rowIndex": "102", "data": {"COL-1": "111", "COL-2": "222"}}];
let testTableActive = { "id": testTableId, "columnTitles": testTableColTitltes, "rows": testTableActiveRows }; 
let testTableBackup = { "id": testTableId, "columnTitles": testTableColTitltes, "rows": testTableBackupRows }; 

ReactDOM.render(
  <React.StrictMode>
    <SpreadsheetTable 
      activeData={testTableActive} 
      backupData={testTableBackup} />
  </React.StrictMode>, 
  document.getElementById('test-table')
) 