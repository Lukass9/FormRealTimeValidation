import React from 'react';
import { act } from 'react-dom/test-utils';
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import App from './App';

describe("Render form", ()=>{
  it('check if all label displayed',()=>{
    act(()=>{
      render(<App />);
    })
      
    screen.getByText("Name")
    screen.getByText("Surname")
    screen.getByText("Birth date")
    screen.getByText("Email")
    screen.getByText("Male")
    screen.getByText("Female")
  }),

  it('check all fill input', async()=>{
    act(()=>{
      render(<App />);
    })
    act(()=>{
      fireEvent.change(screen.getByTestId('Name'), {target: {value: 'lukasz'}} )
      fireEvent.change(screen.getByTestId('Surname'), {target: {value: 'pisarek'}} )
      fireEvent.change(screen.getByTestId('Birth date'), {target: {value: '2022-07-13'}} )
      fireEvent.change(screen.getByTestId('Email'), {target: {value: 'test@test.pl'}} )
      fireEvent.click(screen.getByTestId('Female'))
    })
    expect(screen.getByTestId('Name').value).toBe('lukasz')
    expect(screen.getByTestId('Surname').value).toBe('pisarek')
    expect(screen.getByTestId('Birth date').value).toBe('2022-07-13')
    expect(screen.getByTestId('Email').value).toBe('test@test.pl')
    await waitFor(()=>{
      const note = screen.queryByText('Email is not valid')
      expect(note).toBeNull()
    })
    expect(screen.getByTestId('Female').value).not.toBe('Male')
    expect(screen.getByTestId('Female').value).toBe('Female')
  }),

  it('check name validation',async ()=>{
    act(()=>{
      render(<App />);
    })
    act(()=>{
      fireEvent.change(screen.getByTestId('Name'), {target: {value: 'lu'}} )
    })
    await screen.findByText('Name must be more than 3 characters')

    act(()=>{
      fireEvent.change(screen.getByTestId('Name'), {target: {value: '1234'}} )
    })
    await waitFor(() => {
      const note = screen.queryByText('Name must be more than 3 characters')
      expect(note).toBeNull()
    })
    act(()=>{
      fireEvent.change(screen.getByTestId('Name'), {target: {value: ''}} )
    })
    await screen.findByText('Name is required')
  }),

  it('check birth date validation',async ()=>{
    act(()=>{
      render(<App />);
    });
    act(()=>{
      fireEvent.click(screen.getByText('Submit'))
    });
    await screen.findByText('Birth date is required')
  })

  it('check email validation', async()=>{
    act(()=>{
      render(<App />)
    });
    act(()=>{
      fireEvent.change(screen.getByTestId('Email'), {target: {value: 'lukaspl'}} )
    });
    await screen.findByText('Email is not valid')
  
  }),

  it("send correct filled form", async()=>{
    act(()=>{
      render(<App />);
    })
    act(()=>{
      fireEvent.change(screen.getByTestId('Name'), {target: {value: 'lukasz'}} )
      fireEvent.change(screen.getByTestId('Surname'), {target: {value: 'pisarek'}} )
      fireEvent.change(screen.getByTestId('Birth date'), {target: {value: '2022-07-13'}} )
      fireEvent.change(screen.getByTestId('Email'), {target: {value: 'test@test.pl'}} )
      fireEvent.click(screen.getByTestId('Female'))
      fireEvent.click(screen.getByText('Submit'))    
    })

    await waitFor(()=>{
      screen.findByText('lukasz pisarek 2022-07-13 test@test.pl Female')
    })
  })

})