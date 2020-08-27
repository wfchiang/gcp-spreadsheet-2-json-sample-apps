import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() });

import SpreadsheetCell from "./SpreadsheetCell"

describe("Tests for SpreadsheetCell", () => {
    it("Always Pass!", () => {}); 

    it("Create a shadow element", () => {
        const ssCell = shallow(
            <SpreadsheetCell
                cellKey="ss-cell-101-xyz" 
                isFixed={true} 
                activeData="123" />
        ); 
        
        expect(ssCell.text()).to.eq("123"); 
    }); 
}); 