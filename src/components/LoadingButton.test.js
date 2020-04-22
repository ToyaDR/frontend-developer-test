import React from 'react';
import { shallow } from 'enzyme';
import { LoadingButton } from './LoadingButton';

describe('<LoadingButton loading={true} />', () => {
  const clickFn = jest.fn();

  describe('success state', () => {
    const wrapper = shallow(<LoadingButton buttonProps={{ onClick: clickFn }} loading={false} error={false} />);

    it('renders loading button', () => {
      expect(wrapper.find({ 'data-testid': 'circular-progress' })).toHaveLength(0);
      expect(wrapper.find({ 'data-testid': 'error-message' })).toHaveLength(0);
      expect(wrapper.find({ 'data-testid': 'loading-button' })).toHaveLength(1);
    });

    it('clicking button should call function passed in', () => {
      wrapper
        .find({ 'data-testid': 'loading-button' })
        .simulate('click');

      expect(clickFn).toHaveBeenCalled();
    });
  });

  describe('loading state', () => {
    const loadingWrapper = shallow(<LoadingButton loading={true} error={false}/>);

    it('render circular progress only', () => {
      expect(loadingWrapper.find({ 'data-testid': 'circular-progress' })).toHaveLength(1);
      expect(loadingWrapper.find({ 'data-testid': 'error-message' })).toHaveLength(0);
      expect(loadingWrapper.find({ 'data-testid': 'loading-button' })).toHaveLength(0);
    });
  });

  describe('error state', () => {
    const errorWrapper = shallow(<LoadingButton loading={false} error={true} buttonProps={{ onClick: clickFn }}/>);

    it('render button and error message during error state', () => {
      expect(errorWrapper.find({ 'data-testid': 'circular-progress' })).toHaveLength(0);
      expect(errorWrapper.find({ 'data-testid': 'error-message' })).toHaveLength(1);
      expect(errorWrapper.find({ 'data-testid': 'loading-button' })).toHaveLength(1);
    });

    it('clicking button should call function passed in', () => {
      errorWrapper
        .find({ 'data-testid': 'loading-button' })
        .simulate('click');

      expect(clickFn).toHaveBeenCalled();
    });
  });
});
