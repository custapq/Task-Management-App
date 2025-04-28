import { useEffect, useState } from 'react';
import API from '../api/api';
import TaskCard from '../components/TaskCard';
import TaskCreate from '../components/TaskCreate';

export interface Task {
  taskId: string;
  title: string;
  description?: string;
  taskStatus: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}

const TaskPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]); // state เก็บข้อมูล Task
  const [showCreateModal, setShowCreateModal] = useState(false); // state การแสดง Modal ที่ใช้สร้าง Task

  const fetchTasks = async () => { //function ดึงข้อมูล Task
    const res = await API.get('/tasks');
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const status: ('PENDING' | 'IN_PROGRESS' | 'COMPLETED')[] = ['PENDING', 'IN_PROGRESS', 'COMPLETED'];

  // กำหนดสีพื้นหลังตาม status
  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-white';
      case 'IN_PROGRESS':
        return 'bg-yellow-200';
      case 'COMPLETED':
        return ' bg-green-200';
      default:
        return 'bg-white';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold mb-3">Task Management Application</h1>

        {/* Create Task และ Logout Button */}
        <div className="space-x-4">
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            + Create Task
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      {/* แสดง Task ตาม Task Status */}
      <div className="grid grid-cols-3 gap-6">
        {status.map((status) => (
          <div
            key={status}
            className={`p-4 rounded-lg shadow-md ${getStatusBgColor(status)}`}
          >
            <h2 className="text-xl font-semibold mb-4 text-center">
              {status.replace('_', ' ')}
            </h2>

            {/* filter Task ตาม Task Status */}
            {tasks
              .filter((task) => task.taskStatus === status)
              .map((task) => (
                <TaskCard
                  key={task.taskId}
                  task={task}
                  onTaskUpdated={fetchTasks}
                />
              ))}
          </div>
        ))}
      </div>

      {/* Modal สำหรับสร้าง Task ใหม่ */}
      {showCreateModal && (
        <TaskCreate
          onClose={() => {
            setShowCreateModal(false);
            fetchTasks();
          }}
        />
      )}
    </div>
  );
};

export default TaskPage;
