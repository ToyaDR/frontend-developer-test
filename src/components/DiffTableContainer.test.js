import React from 'react';
import { shallow } from 'enzyme';
import { DiffTableContainer } from './DiffTableContainer';

describe('<DiffTableContainer />', () => {
  const mockFetchData = jest.fn();
  const wrapper = shallow(<DiffTableContainer variant="user" fetchData={mockFetchData} />)

  describe('render()', () => {
    it('renders diff table and loading button', () => {
      expect(wrapper.find({ 'data-testid': 'diff-table' })).toHaveLength(1);
      expect(wrapper.find({ 'data-testid': 'loading-button' })).toHaveLength(1);
    });
  });
});
