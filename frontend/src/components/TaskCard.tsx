import { useState } from 'react';
import { Task } from '../pages/TaskPage'; 
import TaskUpdate from './TaskUpdate';
import API from '../api/api';

interface TaskCardProps {
  task: Task; // ข้อมูล task ที่จะแสดง
  onTaskUpdated: () => void; // function callback เพื่อ refresh หน้าจอ
}
const TaskCard = ({ task, onTaskUpdated }: TaskCardProps) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false); // state สำหรับควบคุมการแสดง Modal แก้ไข Task

  // function ลบ Task
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) { 
      await API.delete(`/tasks/${task.taskId}`);
      onTaskUpdated();
    }
  };

  return (
    // Card แสดงข้อมูล Task
    <div className="bg-white shadow p-4 rounded-2xl mb-4">
      <h3 className="text-lg font-bold">Title : {task.title}</h3>
      {task.description && (
        <p className="text-gray-600">Description : {task.description}</p>
      )}
      <p className="text-sm ">Status : {task.taskStatus}</p>

      {/* ปุ่ม Edit และ Delete */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setShowUpdateModal(true)}
          className="bg-yellow-400 text-white py-1 px-3 rounded hover:bg-yellow-500"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>

      {/* ถ้า showUpdateModal เป็น true แล้วแสดง TaskUpdate component */}
      {showUpdateModal && (
        <TaskUpdate
          task={task}
          onClose={() => {
            setShowUpdateModal(false);
            onTaskUpdated();
          }}
        />
      )}
    </div>
  );
};

export default TaskCard;
