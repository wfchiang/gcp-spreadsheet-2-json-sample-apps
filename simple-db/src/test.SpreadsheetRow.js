import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'
import regeneratorRuntime from "regenerator-runtime";
configure({ adapter: new Adapter() });

import SpreadsheetRow from "./SpreadsheetRow"

describe("Tests for SpreadsheetRow", () => {

    const dataGoodColumnTitles = ['COL-1', 'COL-2']; 

    it ("Render table header", () => {
        let ssRow = shallow(
            <SpreadsheetRow 
                isHeader={true} 
                colTitles={dataGoodColumnTitles} />

        );
        let cellComps = ssRow.find('th'); 
        expect(cellComps.length).to.be.eq(3); 
        expect(cellComps.at(0).text()).to.be.eq('Index'); 
        expect(cellComps.at(1).text()).to.be.eq(dataGoodColumnTitles[0]); 
        expect(cellComps.at(2).text()).to.be.eq(dataGoodColumnTitles[1]);
    }); 
}); 