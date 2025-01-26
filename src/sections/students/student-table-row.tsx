import { useState } from 'react';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import {
  Box,
  Avatar,
  Dialog,
  Button,
  Tooltip,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

import type { StudentProps } from './types/student-types';

type StudentTableRowProps = {
  row: StudentProps;
  onView: (student: StudentProps) => void;
  onEdit: (student: StudentProps) => void;
  onDelete: (student: StudentProps) => void;
};

export function StudentTableRow({ row, onView, onEdit, onDelete }: StudentTableRowProps) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleDelete = () => {
    onDelete(row);
    setOpenDeleteDialog(false);
  };

  return (
    <>
      <TableRow hover>
        <TableCell>
          <Box display="flex" alignItems="center" gap={2} sx={{ textTransform: 'capitalize' }}>
            <Avatar src={row.avatarUrl}>{row.name[0]}</Avatar>
            {row.name}
          </Box>
        </TableCell>
        <TableCell>{row.class}</TableCell>
        <TableCell>{row.section}</TableCell>
        <TableCell>{row.rollNumber}</TableCell>
        <TableCell>{row.gender}</TableCell>
        <TableCell>{row.contactNumber}</TableCell>
        <TableCell>{row.bloodGroup}</TableCell>
        <TableCell align="center">
          <Tooltip title="View Details">
            <IconButton onClick={() => onView(row)}>
              <Iconify icon="eva:eye-fill" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit Student">
            <IconButton onClick={() => onEdit(row)}>
              <Iconify icon="eva:edit-fill" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Student">
            <IconButton onClick={() => setOpenDeleteDialog(true)}>
              <Iconify icon="eva:trash-2-fill" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete{' '}
            <Typography
              component="span"
              style={{ textTransform: 'capitalize', fontWeight: 'bold' }}
            >
              {row.name}?
            </Typography>{' '}
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setOpenDeleteDialog(false)}
            size="large"
            sx={{
              px: 3,
              py: 1,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            color="error"
            size="large"
            sx={{
              px: 3,
              py: 1,
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
