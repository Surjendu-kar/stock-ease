import { useCallback, useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { Iconify } from 'src/components/iconify';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { StudentProps } from './student-table-row';

type StudentFormModalProps = {
  open: boolean;
  onClose: () => void;
  student?: StudentProps;
  onSubmit: (data: Omit<StudentProps, 'id'>) => void;
};

export function StudentFormModal({ open, onClose, student, onSubmit }: StudentFormModalProps) {
  const [formData, setFormData] = useState({
    name: student?.name?.trim() || '',
    class: student?.class || '',
    section: student?.section || '',
    rollNumber: student?.rollNumber?.trim() || '',
    avatarUrl: student?.avatarUrl || '',
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, avatarUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = useCallback(() => {
    setFormData({
      name: student?.name || '',
      class: student?.class || '',
      section: student?.section || '',
      rollNumber: student?.rollNumber || '',
      avatarUrl: student?.avatarUrl || '',
    });
  }, [student]);

  useEffect(() => {
    if (open) {
      resetForm();
    }
  }, [open, resetForm]);

  // Class options
  const classes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

  // Section options
  const sections = ['A', 'B', 'C', 'D'];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{student ? 'Edit Student' : 'Add New Student'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} display="flex" justifyContent="center">
            <input
              id="avatar-input"
              accept="image/*"
              type="file"
              hidden
              onChange={handleImageChange}
              aria-label="Upload avatar"
            />
            <label htmlFor="avatar-input" aria-label="Upload avatar">
              <IconButton component="span">
                <Avatar src={formData.avatarUrl} sx={{ width: 80, height: 80 }}>
                  <Iconify icon="eva:camera-fill" />
                </Avatar>
              </IconButton>
            </label>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Class</InputLabel>
              <Select
                value={formData.class}
                label="Class"
                onChange={(e) => setFormData((prev) => ({ ...prev, class: e.target.value }))}
              >
                {classes.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Section</InputLabel>
              <Select
                value={formData.section}
                label="Section"
                onChange={(e) => setFormData((prev) => ({ ...prev, section: e.target.value }))}
              >
                {sections.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Roll Number"
              value={formData.rollNumber}
              onChange={(e) => setFormData((prev) => ({ ...prev, rollNumber: e.target.value }))}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={() => onSubmit(formData)}>
          {student ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
