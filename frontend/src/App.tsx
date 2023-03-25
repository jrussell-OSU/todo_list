import './App.css'
import * as React from 'react'
import { useEffect, useState } from 'react'
import TodoSlip from './components/TodoSlip'

function App (): JSX.Element {
  // usestate for setting a javascript
  // object for storing and using data
  const [data, setdata] = useState({
    name: '',
    priority: 0,
    description: ''
  })
  // Using useEffect for single rendering
  useEffect(() => {
    // Using fetch to fetch the api from
    // flask server it will be redirected to proxy
    fetch('/data')
      .then(async (res) => {
        await res.json()
          .then((newData) => {
            // Setting a data from api
            setdata({
              name: newData.Name,
              priority: newData.priority,
              description: newData.description
            })
          })
      })
      // eslint-disable-next-line no-console
      .catch((error: string) => { console.error(`Error fetching '/': ${error}`) })
  }, [])

  return (
    <div className="App">
      <TodoSlip
        name={data.name}
        description={data.description}
        priority={data.priority}
      />
    </div>
  )
}

App.propTypes = {

}

export default App
