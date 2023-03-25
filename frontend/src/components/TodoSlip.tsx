import * as React from 'react'
import '../App.css'
import { useState } from 'react'
// import { FC } from 'react'
import { Dialog, DialogTitle, DialogContent } from '@mui/material'
import styled from '@emotion/styled'

const Container = styled.div(props => ({
  color: 'brown'
}))

const TodoSlip = (
  props:
  {
    name: string
    description: string
    priority: number
  }
): JSX.Element => {
  const [dialogIsOpen] = useState(true)

  return (
    <div>
      <Dialog
        className="todo-slip"
        open={ dialogIsOpen }
      >
        <DialogTitle>Task</DialogTitle>
        <DialogContent>
          <Container>
            <h5>Name: {props.name}</h5>
            <h5>Description: {props.description}</h5>
            <h5>Priority: {props.priority}</h5>
          </Container>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default TodoSlip
