import * as React from 'react'
import { TextField, Button, Card, CardContent } from '@mui/material'
import '../App.css'
import '@fontsource/roboto'
import { TodoSlipProps } from '../types/types'
import { createTodo } from '../utils/todoServices'

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

function AddTodoItemForm(): JSX.Element {
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
    <div className='addTodoItemForm'>
      <Card raised>
        <CardContent>
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
              New ToDo
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default AddTodoItemForm
