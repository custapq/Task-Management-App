import { Formik, Form, Field, ErrorMessage } from 'formik'; 
import * as Yup from 'yup';
import API from '../api/api';

interface TaskCreateProps {
  onClose: () => void;
}

const TaskCreate = ({ onClose }: TaskCreateProps) => {
  return (
    // Modal สำหรับสร้าง Task ใหม่ (Backdrop เบลอพื้นหลัง)
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-2xl bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Create Task</h2>

        {/* Formik จัดการฟอร์ม */}
        <Formik
          initialValues={{ title: '', description: '' }}
          
          // validation โดยใช้ Yup
          validationSchema={Yup.object({
            title: Yup.string().required('Required'), 
            description: Yup.string(),
          })}
          
          // function submit form
          onSubmit={async (values, { setSubmitting }) => {
            // ส่งข้อมูล Task ใหม่ไปยัง API
            await API.post('/tasks/create', values);
            setSubmitting(false); // เมื่อส่งข้อมูลเสร็จแล้ว เปลี่ยน state
            onClose();
          }}
        >

          {/* isSubmitting ใช้เพื่อป้องกันการ submit form ซ้ำ */}
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <Field
                  name="title" 
                  type="text"
                  placeholder="Title"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {/* error message ถ้า validation ล้มเหลว */}
                <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <Field
                  name="description" 
                  as="textarea" 
                  placeholder="Description (optional)"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {/* แสดง error message หาก validation ล้มเหลว */}
                <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  disabled={isSubmitting} 
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                >
                  {isSubmitting ? 'Creating...' : 'Create'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TaskCreate;
