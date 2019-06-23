import React from 'react';
import { shallow } from 'enzyme';
import SignupComponent from '../../src/component/signup/signupComponent';
import Constants from '../../src/Constants'

describe('SignupComponent tests', () => {

    it('Username input can be changed', () => {
        const wrapper = shallow(<SignupComponent/>);
        const usernameInput = wrapper.find('#username');
        const event = {target: {id: "mockId", value: "mockValue"}};
        usernameInput.simulate('change', event);
        expect(wrapper.state('mockId')).toEqual('mockValue');
      });

  });