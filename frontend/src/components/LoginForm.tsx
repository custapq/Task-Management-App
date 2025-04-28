import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/api';

const LoginForm = () => {
  const navigate = useNavigate(); // สำหรับไปยัง Page อื่น

  return (
    <Formik // ใช้ Formik จัดการ form
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email').required('Email Required'),
        password: Yup.string().min(6, 'At least 6 characters').required('Password Required'),
      })}

      // function เมื่อ submit form
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const res = await API.post('/auth/login', values); // ส่งข้อมูลที่ได้รับจาก form ไปยัง API เพื่อ login
          localStorage.setItem('token', res.data.access_token); // เก็บ access_token ลงใน localStorage
          navigate('/tasks'); // ไปยังหน้า TaskPage
        } catch (err) {
          console.error(err);
          alert('Invalid email or password'); // แสดงข้อความเมื่อ login ไม่สำเร็จ
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {/* isSubmitting ใช้เพื่อป้องกันการ submit form ซ้ำ */}
      {({ isSubmitting }) => (
        <Form className="space-y-6 max-w-md mx-auto">
          
          <div>
            <Field
              name="email"
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div>
            <Field
              name="password"
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>

          <div className="text-center mt-4 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
