import * as React from 'react'
import '../App.css'
// import { FC } from 'react'
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  createTheme,
  ThemeProvider
} from '@mui/material'
// import styled from '@emotion/styled'
import '@fontsource/roboto'
import { green, purple } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    background: {
      paper: purple[500]
    },
    primary: {
      // light: will be calculated from palette.primary.main,
      main: green[500]
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00'
    }
  }
})

const TodoCard = (
  props:
  {
    name: string
    difficulty: number
    priority: string
    notes: string
  }
): JSX.Element => {
  return (
    <div className='todoCard'>
      <ThemeProvider theme={theme}>
        <Card>
          <CardActionArea>
            <CardContent>
              <Typography
                gutterBottom
                variant="body1"
                color="primary"
                sx={{ fontWeight: 'bold' }}
              >
                {props.name} <br/>
                priority: {props.priority} <br/>
                difficulty (1-10): {props.difficulty} <br/>
                notes: {props.notes} <br/>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </ThemeProvider>
    </div>
  )
}

export default TodoCard
