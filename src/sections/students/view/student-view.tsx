import { useState, useCallback, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { Snackbar, Alert, Skeleton, TableRow, TableCell } from '@mui/material';
import { auth } from 'src/auth/config';

import { DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { studentService } from 'src/services/student.service';
import { StudentFormModal } from '../student-form-modal';

import { TableNoData } from '../table-no-data';
import { StudentTableRow } from '../student-table-row';
import { StudentTableHead } from '../student-table-head';
import { StudentTableToolbar } from '../student-table-toolbar';

import { applyFilter, getComparator } from '../utils';
import type { StudentProps } from '../student-table-row';

export function StudentView() {
  const [user, setUser] = useState(auth.currentUser);
  const [authLoading, setAuthLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<StudentProps[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentProps | undefined>();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const table = useTable();
  const [filterName, setFilterName] = useState('');

  const dataFiltered = applyFilter({
    inputData: students,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        if (user?.uid) {
          const data = await studentService.getAll(user.uid);
          setStudents(data);
        }
      } finally {
        setLoading(false);
      }
    };
    loadStudents();
  }, [user]);

  const handleAdd = () => {
    setSelectedStudent(undefined);
    setOpenModal(true);
  };

  const handleView = (student: StudentProps) => {
    setSelectedStudent(student);
    setOpenModal(true);
  };

  const handleEdit = (student: StudentProps) => {
    setSelectedStudent(student);
    setOpenModal(true);
  };

  const handleSubmit = async (formData: Omit<StudentProps, 'id'>) => {
    if (!user?.uid) {
      setSnackbarMessage('User not authenticated');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }
    try {
      const studentData = { ...formData, userId: user.uid };

      if (selectedStudent) {
        await studentService.update(selectedStudent.id, studentData);
        setStudents((prev) =>
          prev.map((s) => (s.id === selectedStudent.id ? { ...s, ...studentData } : s))
        );
        setSnackbarMessage('Student updated successfully');
      } else {
        const docRef = await studentService.add(studentData);
        setStudents((prev) => [{ id: docRef.id, ...studentData }, ...prev]);
        setSnackbarMessage('Student added successfully');
      }
      setOpenSnackbar(true);
      setSnackbarSeverity('success');
      setOpenModal(false);
    } catch (error) {
      setSnackbarMessage('Error occurred');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      console.error('Error:', error);
    }
  };

  const handleDelete = async (student: StudentProps) => {
    try {
      await studentService.delete(student.id);
      setStudents((prev) => prev.filter((s) => s.id !== student.id));
      setSnackbarMessage('Student deleted successfully');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage('Error deleting student');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      console.error('Error:', error);
    }
  };

  return (
    <>
      <DashboardContent>
        <Box display="flex" alignItems="center" mb={5}>
          <Typography variant="h4" flexGrow={1}>
            Students
          </Typography>
          {user ? (
            <Button
              variant="contained"
              color="inherit"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={handleAdd}
            >
              New Student
            </Button>
          ) : null}
        </Box>

        <Card>
          <StudentTableToolbar
            filterName={filterName}
            onFilterName={(event) => {
              setFilterName(event.target.value);
              table.onResetPage();
            }}
          />

          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <StudentTableHead
                  order={table.order}
                  orderBy={table.orderBy}
                  onSort={table.onSort}
                  headLabel={[
                    { id: 'name', label: 'Name' },
                    { id: 'class', label: 'Class' },
                    { id: 'section', label: 'Section' },
                    { id: 'rollNumber', label: 'Roll Number' },
                    { id: 'gender', label: 'Gender' },
                    { id: 'contactNumber', label: 'Contact' },
                    { id: 'bloodGroup', label: 'Blood Group' },
                    { id: 'actions', label: 'Actions', align: 'center' },
                  ]}
                />
                <TableBody>
                  {loading || authLoading ? (
                    <>
                      <TableRow>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Skeleton variant="circular" width={40} height={40} />
                            <Skeleton width={150} />
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Skeleton width={60} />
                        </TableCell>
                        <TableCell>
                          <Skeleton width={60} />
                        </TableCell>
                        <TableCell>
                          <Skeleton width={80} />
                        </TableCell>
                        <TableCell>
                          <Skeleton width={60} />
                        </TableCell>
                        <TableCell>
                          <Skeleton width={100} />
                        </TableCell>
                        <TableCell>
                          <Skeleton width={60} />
                        </TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                            <Skeleton width={40} height={40} variant="circular" />
                            <Skeleton width={40} height={40} variant="circular" />
                            <Skeleton width={40} height={40} variant="circular" />
                          </Box>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Skeleton variant="circular" width={40} height={40} />
                            <Skeleton width={150} />
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Skeleton width={60} />
                        </TableCell>
                        <TableCell>
                          <Skeleton width={60} />
                        </TableCell>
                        <TableCell>
                          <Skeleton width={80} />
                        </TableCell>
                        <TableCell>
                          <Skeleton width={60} />
                        </TableCell>
                        <TableCell>
                          <Skeleton width={100} />
                        </TableCell>
                        <TableCell>
                          <Skeleton width={60} />
                        </TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                            <Skeleton width={40} height={40} variant="circular" />
                            <Skeleton width={40} height={40} variant="circular" />
                            <Skeleton width={40} height={40} variant="circular" />
                          </Box>
                        </TableCell>
                      </TableRow>
                    </>
                  ) : user ? (
                    <>
                      {dataFiltered
                        .slice(
                          table.page * table.rowsPerPage,
                          table.page * table.rowsPerPage + table.rowsPerPage
                        )
                        .map((row) => (
                          <StudentTableRow
                            key={row.id}
                            row={row}
                            onView={handleView}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                          />
                        ))}

                      {notFound && <TableNoData searchQuery={filterName} />}
                    </>
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                        <Typography variant="h6" paragraph>
                          Please login to manage students
                        </Typography>
                        <Button variant="contained" href="/sign-in">
                          Login
                        </Button>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            component="div"
            page={table.page}
            count={students.length}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />
        </Card>

        <StudentFormModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          student={selectedStudent}
          onSubmit={handleSubmit}
          userId={user?.uid}
        />
      </DashboardContent>

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert severity={snackbarSeverity} onClose={() => setOpenSnackbar(false)}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

function useTable() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    orderBy,
    onSort,
    rowsPerPage,
    onResetPage,
    onChangePage,
    onChangeRowsPerPage,
  };
}
