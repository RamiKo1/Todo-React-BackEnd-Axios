import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import customFetch from './utils'
import { toast } from 'react-toastify'

//! Get All Task
export const useFetchTasks = () => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['tasks'],
    //! 1
    queryFn: async () => {
      const { data } = await customFetch.get('/')
      return data
    },
    //! 2
    // queryFn: () => customFetch.get('/'),
  })
  return { isLoading, isError, data }
}
//! Create New Task
export const useCreateTasks = () => {
  const queryClient = useQueryClient()

  const { mutate: createTask, isLoading } = useMutation({
    mutationFn: (taskTitle) => customFetch.post('/', { title: taskTitle }),
    //!Success
    onSuccess: () => {
      //!Refresh Data
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      toast.success('task added')
    },
    //!Error
    onError: (error) => {
      toast.error(error.response.data.msg)
    },
  })
  return { createTask, isLoading }
}

//! Edit Task
export const useEditTasks = () => {
  const queryClient = useQueryClient()
  const { mutate: editTask } = useMutation({
    mutationFn: ({ taskId, isDone }) => {
      return customFetch.patch(`/${taskId}`, { isDone })
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
  return { editTask }
}

//! Delete Task
export const useDeleteTasks = () => {
  const queryClient = useQueryClient()
  const { mutate: deleteTask, isLoading: deleteTaskLoading } = useMutation({
    mutationFn: ({ taskId }) => {
      return customFetch.delete(`/${taskId}`)
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
  return { deleteTask, deleteTaskLoading }
}
