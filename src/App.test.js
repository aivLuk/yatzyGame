import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Dice from './Dice/Dice';
import App from './App';

configure({ adapter: new Adapter() });

describe('<App />', () => {

    it('works', () => {
        expect(2 + 2).toEqual(4);
    })

    it('should render 0 <Dice /> components when component is mounted for the first time', () => {
        let wrapper = shallow(<App />)
        expect(wrapper.find(Dice)).toHaveLength(0)
    })

})