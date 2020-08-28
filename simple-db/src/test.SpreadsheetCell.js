import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'
configure({ adapter: new Adapter() });

import SpreadsheetCell from "./SpreadsheetCell"

describe("Tests for SpreadsheetCell", () => {
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
        const spyHandleOnClickText = sinon.spy(SpreadsheetCell.prototype, 'handleOnClickText'); 
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
        ssCell.setProps(ssCell.instance().state); 
        expect(spyHandleOnClickText.callCount).to.eq(1); 
        expect(ssCell.instance().state.inEdit).to.eq(true);     
        expect(ssCell.find('input').exists()).to.be.eq(true); 
        expect(ssCell.find('input').length).to.be.eq(1); 
        expect(ssCell.find('input').prop('value')).to.be.eq('123'); 
    }); 
}); 