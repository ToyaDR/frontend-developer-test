import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';
import {DiffTableContainer} from "./DiffTableContainer";

describe('<App />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  describe('render()', () => {
    it('renders the Box', () => {
      expect(wrapper.find({ 'data-testid': 'app-box' })).toHaveLength(1);
    });

    it('renders two DiffTableContainers', () => {
      expect(wrapper.find(DiffTableContainer)).toHaveLength(2);
    })
  });
});
