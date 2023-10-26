import { useDeleteTasks, useEditTasks } from './reactQueryCustomHooks'

const SingleItem = ({ item }) => {
  const { editTask } = useEditTasks()
  const { deleteTask, deleteTaskLoading } = useDeleteTasks()
  return (
    <div className="single-item">
      <input
        type="checkbox"
        checked={item.isDone}
        onChange={() => editTask({ taskId: item.id, isDone: !item.isDone })}
      />
      <p
        style={{
          textTransform: 'capitalize',
          textDecoration: item.isDone && 'line-through',
        }}
      >
        {item.title}
      </p>
      <button
        className="btn remove-btn"
        type="button"
        disabled={deleteTaskLoading}
        onClick={() => deleteTask({ taskId: item.id })}
      >
        delete
      </button>
    </div>
  )
}
export default SingleItem
