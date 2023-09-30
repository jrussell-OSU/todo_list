import * as React from 'react'
import { TextField, Button } from '@mui/material'
import '../App.css'
import '@fontsource/roboto'
import { TodoSlipProps } from '../types/types'

declare module '@mui/material/styles' {
  interface TypographyVariants {
    slipNormal: React.CSSProperties
    slipStrikethrough: React.CSSProperties
  }

  interface TypographyVariantsOptions {
    slipNormal: React.CSSProperties
    slipStrikethrough?: React.CSSProperties
  }
}

async function createTodo(todo: TodoSlipProps) {
  try {
    const response = await fetch('/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    })

    if (!response.ok) {
      throw new Error(`Error posting new todo slip: ${response.status}: ${response.statusText}`)
    }
  } catch (error) {
    console.error('There was a problem posting the todo:', error)
  }
}

function AddTodoSlip(): JSX.Element {
  const [formData, setFormData] = React.useState<TodoSlipProps>({
    id: '',
    name: '',
    difficulty: 0,
    priority: 'low',
    notes: '',
    // You can add other default values here
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const submitData = async () => {
      await createTodo(formData)
    }
    // eslint-disable-next-line no-void
    void submitData()
  }

  return (
    <div className='addTodoSlip'>
      <form onSubmit={handleSubmit}>
        <TextField
          label='Name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          margin='normal'
          fullWidth
        />
        <TextField
          label='Difficulty'
          name='difficulty'
          type='number'
          value={formData.difficulty}
          onChange={handleChange}
          margin='normal'
          fullWidth
        />
        <TextField
          label='Priority'
          name='priority'
          value={formData.priority}
          onChange={handleChange}
          margin='normal'
          fullWidth
        />
        <TextField
          label='Notes'
          name='notes'
          value={formData.notes}
          onChange={handleChange}
          margin='normal'
          fullWidth
        />
        <Button type='submit' variant='contained' color='primary' style={{ marginTop: '1rem' }}>
          Add Todo
        </Button>
      </form>
    </div>
  )
}

export default AddTodoSlip
