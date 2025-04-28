import { Formik, Form, Field, ErrorMessage } from 'formik'; 
import * as Yup from 'yup'; 
import API from '../api/api';
import { Task } from '../pages/TaskPage'; 

interface TaskUpdateProps {
  task: Task;
  onClose: () => void;
}

const TaskUpdate = ({ task, onClose }: TaskUpdateProps) => {
  return (
    // Modal สำหรับ update Task 
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-2xl bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Update Task</h2>

        {/* ใช้ Formik จัดการ form */}
        <Formik
            // กำหนดค่าเริ่มต้นของ form
          initialValues={{
            title: task.title,
            description: task.description || '', 
            taskStatus: task.taskStatus, 
          }}
          
          // การกำหนด validation Yup
          validationSchema={Yup.object({
            title: Yup.string().required('Required'),
            description: Yup.string(), 
            taskStatus: Yup.string().oneOf(['PENDING', 'IN_PROGRESS', 'COMPLETED']).required(),
          })}
          
          // function เมื่อ submit form 
          onSubmit={async (values, { setSubmitting }) => {
            // ส่งข้อมูลที่ได้รับจาก form ไปยัง API เพื่ออัปเดต task
            await API.patch(`/tasks/${task.taskId}`, values);
            setSubmitting(false);
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
                <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <Field
                  name="description"
                  as="textarea"
                  placeholder="Description" 
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <Field
                  name="taskStatus"
                  as="select"
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="PENDING">Pending</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                </Field>
                <ErrorMessage name="taskStatus" component="div" className="text-red-500 text-sm" />
              </div>

              {/* ปุ่ม Cancel และ Update */}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>

                {/* ปุ่ม Update จะส่งข้อมูลไปที่ API เพื่อ update task */}
                <button
                  type="submit"
                  disabled={isSubmitting} 
                  className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500 disabled:opacity-50"
                >
                  {isSubmitting ? 'Updating...' : 'Update'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TaskUpdate;
