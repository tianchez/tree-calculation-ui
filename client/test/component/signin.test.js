import React from 'react';
import { shallow } from 'enzyme';
import SigninComponent from '../../src/component/signin/signinComponent';
import Constants from '../../src/Constants'

describe('SigninComponent tests', () => {
    it('Clicking signup button will navigate to signup page', () => {
      const historyMock = [];
      const wrapper = shallow(<SigninComponent history={historyMock}/>);
      const signUpButton = wrapper.find('.signup-button');
      signUpButton.simulate('click');
      expect(historyMock).toHaveLength(1);
      expect(historyMock[0]).toBe('/signup');
    });

    it('Username input can be changed', () => {
        const wrapper = shallow(<SigninComponent/>);
        const usernameInput = wrapper.find('#username');
        const event = {target: {id: "mockId", value: "mockValue"}};
        usernameInput.simulate('change', event);
        expect(wrapper.state('mockId')).toEqual('mockValue');
      });

    it('Clicking signin will trigger API call', () => {
        const wrapper = shallow(<SigninComponent />);
        const fetchSpy = jest.spyOn(window, 'fetch');

        wrapper.setState({username: 'username', password: 'password'});
        const signInButton = wrapper.find('.signin-button');
        const mockEvent = {
            preventDefault: ()=> ''
        }
        mockEvent.preventDefault();
        signInButton.simulate('click', mockEvent);

        expect(fetchSpy).toHaveBeenCalledTimes(1);
        expect(fetchSpy).toHaveBeenCalledWith(
            `${Constants.HOST_NAME}/login`,
            {
                "body": "{\"username\":\"username\",\"password\":\"password\"}", 
                "headers": {
                         "Content-Type": "application/json",
                       },
                "method": "POST",
            }
          );
      });

  });