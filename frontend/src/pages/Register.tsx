import RegisterForm from '../components/RegisterForm';

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <h1 className=" text-5xl font-bold text-center text-gray-900">Task Management Application</h1>
        <h2 className="text-3xl font-bold text-center text-gray-900">Register</h2>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
