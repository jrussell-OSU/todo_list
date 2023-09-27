import * as React from 'react'
import '../App.css'
import { Card, CardContent, Typography, createTheme, ThemeProvider } from '@mui/material'
import '@fontsource/roboto'
import { blueGrey, grey } from '@mui/material/colors'

declare module '@mui/material/styles' {
  interface TypographyVariants {
    cardNormal: React.CSSProperties
    cardStrikethrough: React.CSSProperties
  }

  interface TypographyVariantsOptions {
    cardNormal: React.CSSProperties
    cardStrikethrough?: React.CSSProperties
  }
}

type TodoCardProps = {
  name: string
  difficulty: number
  priority: string
  notes: string
}

function TodoCard(props: TodoCardProps): JSX.Element {
  // const [cardVariant, setCardVariant] = useState('cardNormal')

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
      cardNormal: {
        textDecoration: 'none',
        fontWeight: 500,
      },
      cardStrikethrough: {
        textDecoration: 'line-through',
        fontWeight: 500,
      },
    },
  })

  /*
  const onTodoCardClick = () => {
    if (cardVariant === 'cardNormal') {
      setCardVariant('cardStrikethrough')
    } else {
      setCardVariant('cardNormal')
    }
  }
  */

  const { name, difficulty, priority, notes } = props
  return (
    <div className='todoCard'>
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

export default TodoCard
