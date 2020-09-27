import React from 'react'
import SpreadsheetRow from './SpreadsheetRow'

import './index.css'

class SpreadsheetTable extends React.Component {
    constructor (props) {
        super(props); 

        this.state = {
            activeData: props.activeData, 
            backupData: props.backupData 
        }; 
    }

    componentWillReceiveProps (newProps) {
        this.setState({
            activeData: newProps.activeData, 
            backupData: newProps.backupData
        }); 
    } 

    makeRowKey (rowIndex) {
        return 'ss-row-' + String(rowIndex); 
    }

    makeCellKey (rowIndex, colTitle) {
        return 'ss-cell-' + String(rowIndex) + '-' + String(colTitle); 
    }

    parseSpreadsheetIndexFromCellKey (cellKey) {
        
    }

    render () {
        return (
            <table>
                <tbody>
                    <SpreadsheetRow 
                        key={'header-row'}
                        isHeader={true}
                        colTitles={this.state.activeData.columnTitles} />
                    {this.state.activeData.rows.map((row, i) => 
                        <SpreadsheetRow 
                            key={'data-row-'+String(i)}
                            isHeader={false} 
                            colTitles={this.state.activeData.columnTitles} 
                            activeData={this.state.activeData.rows[i]} 
                            backupData={this.state.backupData.rows[i]} />
                    )}
                </tbody>
            </table>
        ); 
    }
}

export default SpreadsheetTable; 