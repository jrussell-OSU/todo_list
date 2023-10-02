import * as React from 'react'
import { Card, CardContent, Typography, createTheme, ThemeProvider } from '@mui/material'
import '../App.css'
import '@fontsource/roboto'
import { blueGrey, grey } from '@mui/material/colors'
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

function TodoSlip(props: TodoSlipProps): JSX.Element {
  // const [slipVariant, setSlipVariant] = useState('slipNormal')

  const theme = createTheme({
    palette: {
      background: {
        paper: blueGrey[900],
      },
      primary: {
        main: grey[50],
      },
      secondary: {
        light: '#0066ff',
        main: '#0044ff',
        contrastText: '#ffcc00',
      },
    },
    typography: {
      slipNormal: {
        textDecoration: 'none',
        fontWeight: 500,
      },
      slipStrikethrough: {
        textDecoration: 'line-through',
        fontWeight: 500,
      },
    },
  })

  /*
  const onTodoSlipClick = () => {
    if (slipVariant === 'slipNormal') {
      setSlipVariant('slipStrikethrough')
    } else {
      setSlipVariant('slipNormal')
    }
  }
  */

  const { name, difficulty, priority, notes } = props
  return (
    <div className='todoItem'>
      <ThemeProvider theme={theme}>
        <Card raised>
          <CardContent>
            <Typography gutterBottom variant='body1' color='primary'>
              {name} <br />
              priority: {priority} <br />
              difficulty (1-10): {difficulty} <br />
              notes: {notes}
            </Typography>
          </CardContent>
        </Card>
      </ThemeProvider>
    </div>
  )
}

export default TodoSlip
