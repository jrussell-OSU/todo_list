import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TodoSlipProps } from '../types/types';
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

function AddTodoItemDialog(): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState<TodoSlipProps>({
    id: '',
    name: '',
    difficulty: 0,
    priority: 'low',
    notes: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submitData = async () => {
      await createTodo(formData);
    };
    // eslint-disable-next-line no-void
    void submitData();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='addTodoItemDialog'>
      <Button variant='outlined' onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send
              updates occasionally.
            </DialogContentText>
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
