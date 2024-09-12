import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Exploremenu from "./Exploremenu"
import { menu_list } from '../../assets/assets';


describe('Exploremenu Component', () => {

    const mockSetCategory = jest.fn();
  
    beforeEach(() => {
      jest.clearAllMocks(); 
    });
  
    test('renders correctly', () => {
      render(<Exploremenu category="null" setCategory={mockSetCategory} />);
  
      expect(screen.getByText('Explore our menu')).toBeInTheDocument();
      expect(screen.getByText(/Lorem ipsum dolor sit amet consectetur adipisicing elit/i)).toBeInTheDocument();
    });
  
    test('renders menu items correctly', () => {
      render(<Exploremenu category="null" setCategory={mockSetCategory} />);
  
      menu_list.forEach((item) => {
        expect(screen.getByText(item.menu_name)).toBeInTheDocument();
        // expect(screen.getByAltText(item.menu_name)).toBeInTheDocument(); 
      });
    });

    


  });
  