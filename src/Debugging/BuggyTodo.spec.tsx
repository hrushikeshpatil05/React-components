import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BuggyTodo } from './BuggyTodo';

/**
 * 🧪 Test Suite for BuggyTodo
 * 
 * To pass this round, your component must pass these tests.
 * Since we don't have a test runner configured, use this logic as your
 * "Verification Plan".
 */

describe('BuggyTodo Application', () => {

  // Requirement 1: Adding items
  test('should display a new task when added', () => {
    render(<BuggyTodo />);
    const input = screen.getByPlaceholderText('Add a task...');
    const addBtn = screen.getByText('Add');

    // Act
    fireEvent.change(input, { target: { value: 'Buy Groceries' } });
    fireEvent.click(addBtn);

    // Assert
    expect(screen.getByText('Buy Groceries')).toBeInTheDocument();
  });

  // Requirement 2: Toggling completion
  test('should mark task as completed when clicked', () => {
    // Setup (Add item first)
    render(<BuggyTodo />);
    addTodoItem('Walk dog'); // Helper to add item

    // Act
    const item = screen.getByText('Walk dog');
    fireEvent.click(item);

    // Assert
    expect(item).toHaveClass('completed');
  });

  // Requirement 3: Filtering
  test('should only show completed items when "Completed" filter is active', () => {
    render(<BuggyTodo />);

    // Add 2 items
    addTodoItem('Active Task');
    addTodoItem('Completed Task');

    // Complete one
    fireEvent.click(screen.getByText('Completed Task'));

    // Filter
    fireEvent.click(screen.getByText('Completed'));

    // Assert
    expect(screen.queryByText('Active Task')).not.toBeInTheDocument();
    expect(screen.getByText('Completed Task')).toBeInTheDocument();
  });
});

// Helper function
function addTodoItem(text: string) {
  const input = screen.getByPlaceholderText('Add a task...');
  fireEvent.change(input, { target: { value: text } });
  fireEvent.click(screen.getByText('Add'));
}
