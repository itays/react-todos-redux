import React from 'react';
import { shallow } from 'enzyme';
import Footer from './Footer';

describe('footer', () => {
	it('should render footer correctly', () => {
		const wrapper = shallow(<Footer />);
		expect(wrapper).toMatchSnapshot();
	});
});
