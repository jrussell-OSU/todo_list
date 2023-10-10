import * as React from 'react';
import {
  Dialog,
  Button,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import { TodoProps } from '../types/types';
import '@fontsource/roboto';
import { createTodo } from '../utils/todoServices';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    slipNormal: React.CSSProperties;
    slipStrikethrough: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    slipNormal: React.CSSProperties;
    slipStrikethrough?: React.CSSProperties;
  }
}

type AddTodoItemDialogProps = {
  onTodoAdded: () => void;
};

const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
  },
});

function AddTodoItemDialog({ onTodoAdded }: AddTodoItemDialogProps): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState<TodoProps>({
    id: '',
    name: '',
    difficulty: 0,
    priority: 'low',
    notes: '',
    status: 'incomplete',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submitData = async () => {
      await createTodo(formData);
    };
    // eslint-disable-next-line no-void
    void submitData();
    onTodoAdded();
    handleClose();
  };

  return (
    <div className='addTodoItemDialog'>
      <ThemeProvider theme={theme}>
        <Button variant='contained' onClick={handleClickOpen}>
          Add New Todo
        </Button>
      </ThemeProvider>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Todo</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
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
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type='submit'>Submit</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default AddTodoItemDialog;
