import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'
import regeneratorRuntime from "regenerator-runtime";
configure({ adapter: new Adapter() });

import SpreadsheetRow from "./SpreadsheetRow"

describe("Tests for SpreadsheetRow", () => {

    const dataGoodColumnTitles = ['COL-1', 'COL-2']; 
    const dataGoodActiveRow0 = {"rowIndex": "0", "data": {"COL-1": "abc", "COL-2": "def"}}; 
    const dataGoodBackupRow0 = {"rowIndex": "0", "data": {"COL-1": "abc", "COL-2": "def"}}; 

    it ("Render table header", () => {
        let ssRow = shallow(
            <SpreadsheetRow 
                isHeader={true} 
                colTitles={dataGoodColumnTitles} />

        );
        expect(ssRow.find('tr').length).to.be.eq(1); 

        let cellComps = ssRow.find('th'); 
        expect(cellComps.length).to.be.eq(3); 
        expect(cellComps.at(0).text()).to.be.eq('Index'); 
        expect(cellComps.at(1).text()).to.be.eq(dataGoodColumnTitles[0]); 
        expect(cellComps.at(2).text()).to.be.eq(dataGoodColumnTitles[1]);
    }); 

    it ("Render data row 0", () => {
        let ssRow0 = shallow(
            <SpreadsheetRow 
                isHeader={false} 
                colTitles={dataGoodColumnTitles} 
                activeData={dataGoodActiveRow0} 
                backupData={dataGoodBackupRow0} />
        ); 
        expect(ssRow0.find('tr').length).to.be.eq(1); 

        let cellComps = ssRow0.find('tr').first().find('SpreadsheetCell');  
        expect(cellComps.length).to.be.eq(3); 
        expect(cellComps.at(0).find('SpreadsheetCell').first().dive().find('td').length).to.eq(1); 
        expect(cellComps.at(0).find('SpreadsheetCell').first().dive().text()).to.be.eq(dataGoodActiveRow0.rowIndex); 
        expect(cellComps.at(1).find('SpreadsheetCell').first().dive().find('td').length).to.eq(1); 
        expect(cellComps.at(1).find('SpreadsheetCell').first().dive().text()).to.be.eq(dataGoodActiveRow0.data['COL-1']);
        expect(cellComps.at(2).find('SpreadsheetCell').first().dive().find('td').length).to.eq(1); 
        expect(cellComps.at(2).find('SpreadsheetCell').first().dive().text()).to.be.eq(dataGoodActiveRow0.data['COL-2']);
    });
}); 