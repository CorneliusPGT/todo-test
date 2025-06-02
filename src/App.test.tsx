import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('добавляет задачи, переключает фильтры и очищает выполненные', () => {
  render(<App />);

  const input = screen.getByPlaceholderText('Новая задача');
  const addButton = screen.getByText('Добавить');

  fireEvent.change(input, { target: { value: 'Сделать 1' } });
  fireEvent.click(addButton);

  fireEvent.change(input, { target: { value: 'Сделать 2' } });
  fireEvent.click(addButton);

  expect(screen.getByText('Сделать 1')).toBeInTheDocument();
  expect(screen.getByText('Сделать 2')).toBeInTheDocument();

  const doneButtons = screen.getAllByText('✓');
  fireEvent.click(doneButtons[0]);

  const doneFilterBtn = screen.getByTestId('filter-done');
  fireEvent.click(doneFilterBtn);
  expect(screen.getByText('Сделать 1')).toBeInTheDocument();
  expect(screen.queryByText('Сделать 2')).not.toBeInTheDocument();

  const undoneFilterBtn = screen.getByTestId('filter-undone');
  fireEvent.click(undoneFilterBtn);
  expect(screen.queryByText('Сделать 1')).not.toBeInTheDocument();
  expect(screen.getByText('Сделать 2')).toBeInTheDocument();

  const allFilterBtn = screen.getByTestId('filter-all');
  fireEvent.click(allFilterBtn);
  expect(screen.getByText('Сделать 1')).toBeInTheDocument();
  expect(screen.getByText('Сделать 2')).toBeInTheDocument();

  const clearDoneButton = screen.getByText('Очистить выполненные задачи');
  fireEvent.click(clearDoneButton);

  expect(screen.queryByText('Сделать 1')).not.toBeInTheDocument();
  expect(screen.getByText('Сделать 2')).toBeInTheDocument();
});