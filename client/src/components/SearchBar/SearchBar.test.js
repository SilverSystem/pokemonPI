import React from "react";
import '@testing-library/jest-dom/extend-expect';
import {fireEvent,render} from '@testing-library/react';
import SearchBar from "./SearchBar";
 import {Provider} from 'react-redux';
 import store from '../../redux/store';


describe('<SearchBar />',() =>{

    it('Clicking the search button calls event handler',() =>{
        const mockHandler = jest.fn();
        const component = render(<Provider store={store}><SearchBar handleSearched ={mockHandler}/></Provider>)
        const button = component.getByDisplayValue('Search');
        fireEvent.click(button);
        expect(mockHandler).toHaveBeenCalledTimes(1);
    })
});