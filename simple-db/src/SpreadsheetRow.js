import React from 'react'
import SpreadsheetCell from './SpreadsheetCell'

class SpreadsheetRow extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            isHeader: props.isHeader, 
            colTitles: props.colTitles, 
            rowIndex: (props.activeData ? props.activeData.rowIndex : undefined), 
            isDiff: false,
            isEdit: false, 
            activeData: (props.activeData ? props.activeData.data : undefined), 
            backupData: (props.backupData ? props.backupData.data : undefined)  
        };
    }

    componentWillReceiveProps (newProps) { 
        this.setState({
            isHeader: newProps.isHeader, 
            colTitles: newProps.colTitles, 
            rowIndex: (newProps.activeData ? newProps.activeData.rowIndex : undefined), 
            isDiff: false,
            isEdit: false, 
            activeData: (newProps.activeData ? newProps.activeData.data : undefined), 
            backupData: (newProps.backupData ? newProps.backupData.data : undefined)  
        });
    }

    render() {
        if (this.state.isHeader) {
            return (
                <tr>
                    <th key={'ss-header-rowIndex'}>Index</th>
                    {this.state.colTitles.map((ct, i_ct) => 
                        <th key={'ss-header-'+String(this.state.rowIndex)+'-'+String(ct)}>{this.state.colTitles[i_ct]}</th>)}
                </tr>
            ); 
        }
        else {
            return (
                <tr key={'ss-row-'+String(this.state.rowIndex)}>
                    <SpreadsheetCell 
                        isFixed={true}  
                        key={'ss-cell-'+String(this.state.rowIndex)} 
                        activeData={this.state.rowIndex} />
                    {this.state.colTitles.map((ct, i_ct) => 
                        <SpreadsheetCell 
                            isFixed={false} 
                            key={'ss-cell-'+String(this.state.rowIndex)+'-'+String(ct)} 
                            activeData={this.state.activeData[ct]} 
                            backupData={this.state.activeData[ct]} /> )}
                </tr>
            ); 
        }
    }
}

export default SpreadsheetRow; 