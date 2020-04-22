import React from 'react';
import { shallow } from 'enzyme';
import { DiffTableContainer } from './DiffTableContainer';

describe('<DiffTableContainer />', () => {
  const mockFetchData = jest.fn();
  let wrapper;
  let useEffect;

  const mockUseEffect = () => {
    useEffect.mockImplementationOnce(f => f());
  };

  beforeEach(() => {
    useEffect = jest.spyOn(React, 'useEffect');

    mockUseEffect();
    wrapper = shallow(<DiffTableContainer variant="user" fetchData={mockFetchData} />);
  })


  describe('render()', () => {
    it('calls fetchData', () => {
      expect(mockFetchData).toHaveBeenCalled();
    });
  });

  describe('render()', () => {
    it('renders diff table and loading button', () => {
      expect(wrapper.find({ 'data-testid': 'diff-table' })).toHaveLength(1);
      expect(wrapper.find({ 'data-testid': 'loading-button' })).toHaveLength(1);
    });
  });
});
