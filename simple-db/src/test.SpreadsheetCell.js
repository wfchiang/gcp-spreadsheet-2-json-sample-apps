import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'
import regeneratorRuntime from "regenerator-runtime";
configure({ adapter: new Adapter() });

import SpreadsheetCell from "./SpreadsheetCell"

describe("Tests for SpreadsheetCell", () => {

    let spyHandleOnClickText; 
    let spyHandleOnChangeTextBox; 

    before(async () => {
        spyHandleOnClickText = sinon.spy(SpreadsheetCell.prototype, 'handleOnClickText'); 
        spyHandleOnChangeTextBox = sinon.spy(SpreadsheetCell.prototype, 'handleOnChangeTextBox'); 
    });

    it("Always Pass!", () => {}); 

    it("isFixed is true", () => {
        const ssCell = shallow(
            <SpreadsheetCell
                cellKey="ss-cell-101-xyz" 
                isFixed={true} 
                activeData="123" />
        ); 
        expect(ssCell.text()).to.eq("123"); 
    }); 

    it("isFixed is false. Initial state", () => {
        const ssCell = shallow(
            <SpreadsheetCell
                cellKey="ss-cell-101-xyz" 
                isFixed={false} 
                activeData="123" 
                backupData="123" />
        );
        expect(ssCell.text()).to.eq("123");
        expect(ssCell.instance().state.inEdit).to.eq(false);  

        // click it! 
        ssCell.simulate('click');
        ssCell.setProps(ssCell.instance().state); // trigger the rendering 
        expect(spyHandleOnClickText.callCount).to.be.gt(0); 
        expect(ssCell.instance().state.inEdit).to.be.true; 
        let inputComp = ssCell.find('input'); 
        expect(inputComp.exists()).to.be.true; 
        expect(inputComp.length).to.be.eq(1); 
        expect(inputComp.prop('value')).to.be.eq('123'); 
        expect(inputComp.prop('style').backgroundColor).to.be.eq(ssCell.instance().cleanColor); 
    }); 

    it("isFixed is false. Change text", () => {
        const ssCell = shallow(
            <SpreadsheetCell
                cellKey="ss-cell-101-xyz" 
                isFixed={false} 
                activeData="123" 
                backupData="123" />
        );
        
        // Click it 
        ssCell.simulate('click');
        ssCell.setProps(ssCell.instance().state); // trigger the rendering 

        // Change text 
        ssCell.instance().handleOnChangeTextBox({target: {value: "321"}});
        expect(ssCell.instance().state.activeData).to.be.eq("321"); 
        ssCell.setProps(ssCell.instance().state); // trigger the rendering 
        expect(ssCell.instance().state.inEdit).to.be.true;  
        let inputComp = ssCell.find('input'); 
        expect(inputComp.exists()).to.be.true; 
        expect(inputComp.length).to.be.eq(1); 
        expect(inputComp.prop('value')).to.be.eq("321"); 
        expect(inputComp.prop('style').backgroundColor).to.be.eq(ssCell.instance().dirtyColor); 
    }); 
}); 