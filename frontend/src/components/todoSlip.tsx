import * as React from 'react'
// import { FC } from 'react'
import { Dialog } from 'material-ui/Dialog'

interface todoSlipProps {
  title: string
  description: string
  priority: number
}

const todoSlip = (
  prop:
  {
    title: string
    description: string
    priority: number
  }
): JSX.Element => {
  return (
    <Dialog>
      <h1>test box</h1>
    </Dialog>
  )
}

export default todoSlip
