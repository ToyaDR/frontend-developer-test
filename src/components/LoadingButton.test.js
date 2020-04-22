import React from 'react';
import { shallow } from 'enzyme';
import { LoadingButton } from './LoadingButton';

describe('<LoadingButton loading={true} />', () => {
  const clickFn = jest.fn();

  const wrapper = shallow(<LoadingButton buttonProps={{ onClick: clickFn }} />);
  const errorWrapper = shallow(<LoadingButton error={true} buttonProps={{ onClick: clickFn }}/>);
  const loadingWrapper = shallow(<LoadingButton loading={true}/>);

  describe('render button only by default', () => {
    const wrapper = shallow(<LoadingButton />);
    it('renders circular progress', () => {
      expect(wrapper.find({ 'data-testid': 'circular-progress' })).toHaveLength(0);
      expect(wrapper.find({ 'data-testid': 'error-message' })).toHaveLength(0);
      expect(wrapper.find({ 'data-testid': 'loading-button' })).toHaveLength(1);
    });
  });

  describe('render circular progress only during loading state', () => {
    it('renders circular progress', () => {
      expect(loadingWrapper.find({ 'data-testid': 'circular-progress' })).toHaveLength(1);
      expect(loadingWrapper.find({ 'data-testid': 'error-message' })).toHaveLength(0);
      expect(loadingWrapper.find({ 'data-testid': 'loading-button' })).toHaveLength(0);
    });
  });

  describe('render button and error message during error state', () => {
    it('renders circular progress', () => {
      expect(errorWrapper.find({ 'data-testid': 'circular-progress' })).toHaveLength(0);
      expect(errorWrapper.find({ 'data-testid': 'error-message' })).toHaveLength(1);
      expect(errorWrapper.find({ 'data-testid': 'loading-button' })).toHaveLength(1);
    });
  });

  describe('clicking button should call function passed in', () => {
    it('renders circular progress', () => {
      expect(wrapper.find({ 'data-testid': 'loading-button' })).toHaveLength(1);

      wrapper
        .find({ 'data-testid': 'loading-button' })
        .simulate('click');

      expect(clickFn).toHaveBeenCalled();
    });
  });

  describe('clicking button should call function passed in during error state', () => {
    it('renders circular progress', () => {
      expect(errorWrapper.find({ 'data-testid': 'loading-button' })).toHaveLength(1);

      errorWrapper
        .find({ 'data-testid': 'loading-button' })
        .simulate('click');

      expect(clickFn).toHaveBeenCalled();
    });
  })
});
