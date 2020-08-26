import React from 'react'

class SpreadsheetRow extends React.Component {
    constructor (props) {
        super(props);

        this.isHeader = props.isHeader; 
        this.colTitles = props.colTitles; 

        if (!this.isHeader) {
            if (props.activeData.rowIndex == props.backupData.rowIndex) {
                this.rowIndex = props.activeData.rowIndex; 
                this.backupData = props.backupData.data; 
                this.state = {
                    isDiff: false, 
                    inEdit: false, 
                    data: props.activeData.data
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
                    <th>Index</th>
                    {this.colTitles.map((ct, i_ct) => 
                        <th>{ct}</th>)}
                </tr>
            ); 
        }
        else {
            return (
                <tr key={'ss-row-'+String(this.rowIndex)}>
                    <td key={'ss-cell-'+String(this.rowIndex)}>{this.rowIndex}</td>
                    {this.colTitles.map((ct, i_ct) => 
                        <td key={'ss-cell-'+String(this.rowIndex)+'-'+String(ct)}>{this.state.data[ct]}</td>)}
                </tr>
            ); 
        }
    }
}

export default SpreadsheetRow; 