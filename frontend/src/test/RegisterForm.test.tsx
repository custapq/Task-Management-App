import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import API from '../api/api';
import '@testing-library/jest-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../api/api', () => ({
  default: {
    post: vi.fn()
  }
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

describe('RegisterForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderRegisterForm = () => {
    return render(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>
    );
  };

  it('renders register form with all fields', () => {
    renderRegisterForm();
    
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
    expect(screen.getByText('Already have an account?')).toBeInTheDocument();
  });

  it('shows validation errors for invalid email', async () => {
    renderRegisterForm();
    
    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByText('Invalid email')).toBeInTheDocument();
    });
  });

  it('shows validation error for password less than 6 characters', async () => {
    renderRegisterForm();
    
    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.change(passwordInput, { target: { value: '12345' } });
    fireEvent.blur(passwordInput);

    await waitFor(() => {
      expect(screen.getByText('At least 6 characters')).toBeInTheDocument();
    });
  });

  it('shows validation error when passwords do not match', async () => {
    renderRegisterForm();
    
    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
    
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password456' } });
    fireEvent.blur(confirmPasswordInput);

    await waitFor(() => {
      expect(screen.getByText('Passwords must match')).toBeInTheDocument();
    });
  });

  it('registers successfully and navigates to login', async () => {
    (API.post as ReturnType<typeof vi.fn>).mockResolvedValue({});
    window.alert = vi.fn();
  
    renderRegisterForm();
  
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'password123' } });
  
    fireEvent.click(screen.getByRole('button', { name: /register/i }));
  
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Register successful!');
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  it('shows error alert when registration fails', async () => {
    (API.post as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Registration error'));
    window.alert = vi.fn();
  
    renderRegisterForm();
  
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'password123' } });
  
    fireEvent.click(screen.getByRole('button', { name: /register/i }));
  
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Register failed');
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
}); 