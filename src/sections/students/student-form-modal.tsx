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
import { StudentProps } from './student-table-row';

type StudentFormModalProps = {
  open: boolean;
  onClose: () => void;
  student?: StudentProps;
  onSubmit: (data: Omit<StudentProps, 'id'>) => void;
};

export function StudentFormModal({ open, onClose, student, onSubmit }: StudentFormModalProps) {
  const [formData, setFormData] = useState({
    name: student?.name || '',
    class: student?.class || '',
    section: student?.section || '',
    rollNumber: student?.rollNumber || '',
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
            <TextField
              fullWidth
              label="Class"
              value={formData.class}
              onChange={(e) => setFormData((prev) => ({ ...prev, class: e.target.value }))}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Section"
              value={formData.section}
              onChange={(e) => setFormData((prev) => ({ ...prev, section: e.target.value }))}
            />
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
