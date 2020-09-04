import React from 'react'

class SpreadsheetCell extends React.Component {
    constructor (props) {
        super(props); 

        this.cleanColor = '#DFF7FF'; 
        this.dirtyColor = '#FEC2B6'; 

        this.state = {
            cellKey: props.cellKey, 
            isFixed: props.isFixed, 
            activeData: props.activeData, 
            backupData: props.backupData, 
            inEdit: false, 
            textboxBgc: this.cleanColor 
        }; 

        this.handleOnClickText = this.handleOnClickText.bind(this); 
        this.handleOnChangeTextBox = this.handleOnChangeTextBox.bind(this); 
    }

    handleOnClickText (event) {
        this.setState({
            cellKey: this.state.cellKey, 
            isFixed: this.state.isFixed, 
            activeData: this.state.activeData, 
            backupData: this.state.backupData, 
            inEdit: true, 
            textboxBgc: this.state.textboxBgc
        }); 
    }

    handleOnChangeTextBox (event) {
        let newData = event.target.value; 
        this.setState({
            cellKey: this.state.cellKey,
            isFixed: this.state.isFixed, 
            activeData: newData, 
            backupData: this.state.backupData, 
            inEdit: this.state.inEdit, 
            textboxBgc: (newData==this.state.backupData ? this.cleanColor : this.dirtyColor)
        }); 
    }

    render () {
        if (this.state.isFixed) {
            return (<td key={this.state.cellKey}>{this.state.activeData}</td>); 
        }
        else {
            if (this.state.inEdit || this.state.activeData != this.state.backupData) {
                return (
                <td key={this.state.cellKey}>
                    <input 
                        type="text" 
                        value={this.state.activeData} 
                        onChange={this.handleOnChangeTextBox} 
                        style={{
                            backgroundColor:this.state.textboxBgc
                        }} />
                </td>);     
            }
            else {
                return (
                <td 
                    key={this.state.key} 
                    onClick={this.handleOnClickText} >
                {this.state.activeData}
                </td>); 
            }
        }
    } 
}

export default SpreadsheetCell; 