import * as React from 'react'
import '../App.css'
// import { FC } from 'react'
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  createTheme,
  ThemeProvider,
  ButtonBase,
} from '@mui/material'
// import styled from '@emotion/styled'
import '@fontsource/roboto'
import { green, purple } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    background: {
      paper: purple[500],
    },
    primary: {
      main: green[500],
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      contrastText: '#ffcc00',
    },
  },
})

const onTodoCardClick = (): void => {
  console.log('card click')
}

type TodoCardProps = {
  name: string
  difficulty: number
  priority: string
  notes: string
}

function TodoCard(props: TodoCardProps): JSX.Element {
  const { name, difficulty, priority, notes } = props
  return (
    <div className='todoCard'>
      <ThemeProvider theme={theme}>
        <Card raised>
          <CardActionArea>
            <ButtonBase component='span' onClick={onTodoCardClick}>
              <CardContent>
                <Typography
                  gutterBottom
                  variant='body1'
                  color='primary'
                  sx={{ fontWeight: 'bold' }}
                >
                  {name} <br />
                  priority: {priority} <br />
                  difficulty (1-10): {difficulty} <br />
                  notes: {notes} <br />
                </Typography>
              </CardContent>
            </ButtonBase>
          </CardActionArea>
        </Card>
      </ThemeProvider>
    </div>
  )
}

export default TodoCard
