import React from "react";
import store from "../../redux/store";
import { Provider } from "react-redux";
import '@testing-library/jest-dom/extend-expect';
import {fireEvent,render} from '@testing-library/react';
import Buttons from "./Buttons";


describe('<Buttons />',() =>{

    it('Clicking the Name filter "Ascending Order" calls the event handler',()=>{
        const mockHandlerName = jest.fn();

        const component = render(<Provider store={store}><Buttons handleCreatedClicked={() =>{}} handleTypesClicked={() =>{}} 
        handleNameOrdered={mockHandlerName} handleAttackOrdered={() =>{}} handleSearched={() =>{}}/></Provider>)
        const ascButtons = component.getAllByText('Ascending Order');

        expect(ascButtons).toHaveLength(2)

        fireEvent.click(ascButtons[0]);
        
        expect(mockHandlerName).toHaveBeenNthCalledWith(1,'')
        expect(mockHandlerName).toHaveBeenCalledTimes(2);
        expect(mockHandlerName).toHaveBeenNthCalledWith(2,'asc')
    
    })

    it('Clicking the Attack filter "Ascending Order" calls the event handler',()=>{
        const mockHandlerAttack = jest.fn();

        const component = render(<Provider store={store}><Buttons handleCreatedClicked={() =>{}} handleTypesClicked={() =>{}} 
        handleNameOrdered={() => {}} handleAttackOrdered={mockHandlerAttack} handleSearched={() =>{}}/></Provider>)
        const ascButtons = component.getAllByText('Ascending Order');

        expect(ascButtons).toHaveLength(2)

        fireEvent.click(ascButtons[1]);

        expect(mockHandlerAttack).toHaveBeenNthCalledWith(1,'')
        expect(mockHandlerAttack).toHaveBeenCalledTimes(2);
        expect(mockHandlerAttack).toHaveBeenNthCalledWith(2,'asc')
    
    })

    it('Clicking the Name filter "Descending Order" calls the event handler',()=>{
        const mockHandlerName = jest.fn();
    
        const component = render(<Provider store={store}><Buttons handleCreatedClicked={() =>{}} handleTypesClicked={() =>{}} 
        handleNameOrdered={mockHandlerName} handleAttackOrdered={() =>{}} handleSearched={() =>{}}/></Provider>)
        const desButtons = component.getAllByText('Descending Order');

        expect(desButtons).toHaveLength(2)

        fireEvent.click(desButtons[0]);

        expect(mockHandlerName).toHaveBeenNthCalledWith(1,'')
        expect(mockHandlerName).toHaveBeenCalledTimes(2);
        expect(mockHandlerName).toHaveBeenNthCalledWith(2,'des')
    
    })
    
    it('Clicking the Attack filter "Descending Order" calls the event handler',()=>{
        const mockHandlerAttack = jest.fn();
        
        const component = render(<Provider store={store}><Buttons handleCreatedClicked={() =>{}} handleTypesClicked={() =>{}} 
        handleNameOrdered={() => {}} handleAttackOrdered={mockHandlerAttack} handleSearched={() =>{}}/></Provider>)
        const desButtons = component.getAllByText('Descending Order');

        expect(desButtons).toHaveLength(2)

        fireEvent.click(desButtons[1]);

        expect(mockHandlerAttack).toHaveBeenNthCalledWith(1,'')
        expect(mockHandlerAttack).toHaveBeenCalledTimes(2);
        expect(mockHandlerAttack).toHaveBeenNthCalledWith(2,'des')

    })
    
    // it('Clicking one of the filters calls the event handler',()=>{
    //     const mockHandlerTypes = jest.fn();
        
    //     const component = render(<Provider store={store}><Buttons handleCreatedClicked={() =>{}} handleTypesClicked={mockHandlerTypes} 
    //         handleNameOrdered={() => {}} handleAttackOrdered={() => {}} handleSearched={() =>{}}/></Provider>)
    //     const typesButton = component.getByText('Fighting');

    //     fireEvent.click(typesButton);

    //     expect(mockHandlerTypes).toHaveBeenCalledTimes(1);
    //     expect(mockHandlerTypes).toHaveBeenNthCalledWith(1,1)

    
    // })
    
    it('Clicking the "Only show created Pokemons" filter calls the event handler',()=>{
        const mockHandlerCreated = jest.fn();
        
        const component = render(<Provider store={store}><Buttons handleCreatedClicked={mockHandlerCreated} handleTypesClicked={() => {}} 
        handleNameOrdered={() => {}} handleAttackOrdered={() => {}} handleSearched={() =>{}}/></Provider>)
        const createdButton = component.getByText('Only show created Pokemons')

        fireEvent.click(createdButton);

        expect(mockHandlerCreated).toHaveBeenNthCalledWith(1,false);
        expect(mockHandlerCreated).toHaveBeenCalledTimes(2);
    
    })    
});

