import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { Iconify } from 'src/components/iconify';
import { Avatar, Box, Tooltip } from '@mui/material';

export type StudentProps = {
  id: string;
  userId: string;
  name: string;
  class: string;
  section: string;
  rollNumber: string;
  avatarUrl?: string;
  dateOfBirth: string;
  gender: string;
  guardianName: string;
  contactNumber: string;
  email: string;
  address: string;
  bloodGroup: string;
};

type StudentTableRowProps = {
  row: StudentProps;
  onView: (student: StudentProps) => void;
  onEdit: (student: StudentProps) => void;
  onDelete: (student: StudentProps) => void;
};

export function StudentTableRow({ row, onView, onEdit, onDelete }: StudentTableRowProps) {
  return (
    <TableRow hover>
      <TableCell>
        <Box display="flex" alignItems="center" gap={2}>
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
          <IconButton onClick={() => onDelete(row)}>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
