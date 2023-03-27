import * as React from 'react'
import '../App.css'
import { useState } from 'react'
// import { FC } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Paper
} from '@mui/material'
// import styled from '@emotion/styled'

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
    <Dialog
      open={dialogIsOpen}
    >
      <Paper
        elevation={2}
        sx={{
          backgroundColor: 'lightGray'
        }}
      >
        <DialogTitle>Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <h5>Name: {props.name}</h5>
            <h5>Description: {props.description}</h5>
            <h5>Priority: {props.priority}</h5>
          </DialogContentText>
        </DialogContent>
      </Paper>
    </Dialog>
  )
}

export default TodoSlip
