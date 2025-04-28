import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TaskCard from '../components/TaskCard';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import API from '../api/api';
import { Task } from '../pages/TaskPage';

vi.mock('../api/api', () => ({
  default: {
    delete: vi.fn()
  }
}));

describe('TaskCard', () => {
  const mockTask: Task = {
    taskId: '123',
    title: 'Test Task',
    description: 'This is a test description',
    taskStatus: 'PENDING',
  };

  const onTaskUpdatedMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('render task detail', () => {
    render(<TaskCard task={mockTask} onTaskUpdated={onTaskUpdatedMock} />);

    expect(screen.getByText(/Title : Test Task/i)).toBeInTheDocument();
    expect(screen.getByText(/Description : This is a test description/i)).toBeInTheDocument();
    expect(screen.getByText(/Status : PENDING/i)).toBeInTheDocument();
  });

  it('open updateTask when click edit', () => {
    render(<TaskCard task={mockTask} onTaskUpdated={onTaskUpdatedMock} />);
    
    const editButton = screen.getByRole('button', { name: /Edit/i });
    fireEvent.click(editButton);

    expect(screen.getByText(/Update Task/i)).toBeInTheDocument();
  });

  it('delete task success', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    (API.delete as ReturnType<typeof vi.fn>).mockResolvedValue({});

    render(<TaskCard task={mockTask} onTaskUpdated={onTaskUpdatedMock} />);
    
    const deleteButton = screen.getByRole('button', { name: /Delete/i });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(API.delete).toHaveBeenCalledWith('/tasks/123');
      expect(onTaskUpdatedMock).toHaveBeenCalled();
    });
  });

  it('cancel delete task', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false);

    render(<TaskCard task={mockTask} onTaskUpdated={onTaskUpdatedMock} />);
    
    const deleteButton = screen.getByRole('button', { name: /Delete/i });
    fireEvent.click(deleteButton);

    expect(API.delete).not.toHaveBeenCalled();
    expect(onTaskUpdatedMock).not.toHaveBeenCalled();
  });
});
