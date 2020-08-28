import React from 'react'
import SpreadsheetCell from './SpreadsheetCell'

class SpreadsheetRow extends React.Component {
    constructor (props) {
        super(props);

        this.isHeader = props.isHeader; 
        this.colTitles = props.colTitles; 

        if (!this.isHeader) {
            if (props.activeData.rowIndex == props.backupData.rowIndex) {
                this.rowIndex = props.activeData.rowIndex; 
                this.state = {
                    isDiff: false, 
                    inEdit: false, 
                    activeData: props.activeData.data, 
                    backupData: props.backupData.data 
                };
            }
            else {
                console.error('[SpreadsheetRow] rowIndex mismatching between the activeData and the backupData');
            }
        }
    }

    render() {
        if (this.isHeader) {
            return (
                <tr>
                    <th key={'ss-header-rowIndex'}>Index</th>
                    {this.colTitles.map((ct, i_ct) => 
                        <th key={'ss-header-'+String(this.rowIndex)+'-'+String(ct)}>{ct}</th>)}
                </tr>
            ); 
        }
        else {
            return (
                <tr key={'ss-row-'+String(this.rowIndex)}>
                    <SpreadsheetCell 
                        isFixed={true}  
                        key={'ss-cell-'+String(this.rowIndex)} 
                        activeData={this.rowIndex} />
                    {this.colTitles.map((ct, i_ct) => 
                        <SpreadsheetCell 
                            isFixed={false} 
                            key={'ss-cell-'+String(this.rowIndex)+'-'+String(ct)} 
                            activeData={this.state.activeData[ct]} 
                            backupData={this.state.activeData[ct]} /> )}
                </tr>
            ); 
        }
    }
}

export default SpreadsheetRow; 