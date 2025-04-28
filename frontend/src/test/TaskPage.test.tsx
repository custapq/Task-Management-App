// pages/TaskPage.test.tsx
import TaskPage from '../pages/TaskPage';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import API from '../api/api';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';

// Mock API ทั้งไฟล์
vi.mock('../api/api');

describe('TaskPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetche all tasks', () => {
    const mockTasks = [
      { taskId: '1', title: 'Task 1', taskStatus: 'PENDING' },
      { taskId: '2', title: 'Task 2', taskStatus: 'IN_PROGRESS' },
      { taskId: '3', title: 'Task 3', taskStatus: 'COMPLETED' },
    ];

    (API.get as Mock).mockResolvedValue({ data: mockTasks });

    render(<TaskPage />);

    expect(API.get).toHaveBeenCalledWith('/tasks');

    waitFor(() => {
      expect(screen.getByText('Task 1')).toBeInTheDocument();
      expect(screen.getByText('Task 2')).toBeInTheDocument();
      expect(screen.getByText('Task 3')).toBeInTheDocument();
    });

    expect(screen.getByText('PENDING')).toBeInTheDocument();
    expect(screen.getByText('IN PROGRESS')).toBeInTheDocument();
    expect(screen.getByText('COMPLETED')).toBeInTheDocument();
  });

  it('create task success', () => {
    const mockTask = { taskId: '4', title: 'New Task', taskStatus: 'COMPLETED' };

    (API.post as Mock).mockResolvedValue({ data: mockTask });

    render(<TaskPage />);
    expect(API.get).toHaveBeenCalledWith('/tasks');

    waitFor(() => {
      expect(screen.getByText('New Task')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: '+ Create Task' }));

    waitFor(() => {
      expect(screen.getByText('Create Task')).toBeInTheDocument();
    });
    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'New Task 1234' } });
    fireEvent.click(screen.getByRole('button', { name: 'Create' }));

    waitFor(() => {
      expect(API.post).toHaveBeenCalledWith('/tasks/create', { title: 'New Task 1234' });
      expect(screen.getByText('New Task 1234')).toBeInTheDocument();
      expect(screen.getByText('PENDING')).toBeInTheDocument();
    });
  });

  it('cancel create task', () => {
    render(<TaskPage />);
    fireEvent.click(screen.getByRole('button', { name: '+ Create Task' }));

    waitFor(() => {
      expect(screen.getByText('Create Task')).toBeInTheDocument();
      expect(screen.getByText('Create Description (optional)')).toBeInTheDocument();

    });
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    waitFor(() => {
      expect(screen.getByText('Create Description (optional)')).not.toBeInTheDocument();
    })
    })
});
