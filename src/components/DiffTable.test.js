import React from 'react';
import { shallow } from 'enzyme';
import { DiffTable } from './diff-table/DiffTable';

describe('<DiffTable />', () => {
  const usersDiff = [
    {
      id: 'e28d290a-a2f2-48c2-9001-ff43884e271b',
      timestamp: new Date('2020/2/14').getTime(),
      diff: [
        { field: 'name', oldValue: 'John', newValue: 'Bruce' },
      ],
    },
    {
      id: '8bd0166f-f0c6-48fd-9fcd-a17e76eb1e92',
      timestamp: new Date('2020/2/15').getTime(),
      diff: [
        { field: 'name', oldValue: 'Bruce', newValue: 'Nick' },
      ],
    },
  ]
  let useEffect;
  let wrapper;

  const mockUseEffect = () => {
    useEffect.mockImplementationOnce(f => f());
  };

  beforeEach(() => {
    useEffect = jest.spyOn(React, 'useEffect');

    wrapper = shallow(<DiffTable variant="user" values={usersDiff} />);
  })

  describe('render()', () => {
    it('renders 2 sorted rows', () => {
      mockUseEffect();
      expect(wrapper.find({ 'data-testid': 'diff-table-body-row' })).toHaveLength(2);
    });
  });
});
