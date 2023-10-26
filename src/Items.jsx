import SingleItem from './SingleItem'

import { useFetchTasks } from './reactQueryCustomHooks'
const Items = () => {
  const { isLoading, isError, data } = useFetchTasks()

  if (isLoading) {
    return <p style={{ marginTop: '1rem' }}>Loading...</p>
  }
  //!1
  if (isError) {
    return <p style={{ marginTop: '1rem' }}>There was an error...</p>
  }
  //!2
  // if (error) {
  //   return <p style={{ marginTop: '1rem' }}>{error.response.data}</p>
  // }

  return (
    <div className="items">
      {data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />
      })}
    </div>
  )
}
export default Items
