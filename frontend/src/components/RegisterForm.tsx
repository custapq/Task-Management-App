import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/api';

const RegisterForm = () => {
  const navigate = useNavigate(); //สำหรับไปยัง Page อื่น

  return (
    <Formik // ใช้ Formik จัดการ form
      initialValues={{ email: '', password: '', confirmPassword: '' }}
      validationSchema={Yup.object({ // การกำหนด validation Yup
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(6, 'At least 6 characters').required('Required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password')], 'Passwords must match')
          .required('Required'),
      })}
      // function เมื่อ submit form
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const { email, password } = values;
          await API.post('/auth/register', { email, password }); // ส่งข้อมูลที่ได้รับจาก form ไปยัง API เพื่อสร้าง User ใหม่
          alert('Register successful!');
          navigate('/login'); //กลับไปยังหน้า Login
        } catch (err) {
          console.error(err);
          alert('Register failed');
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

          <div>
            <Field
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
            
            {/* Link ไปยังหน้า Login */}
          <div className="text-center mt-4 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </div>

        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
