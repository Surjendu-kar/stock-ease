import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { STUDENT_DATA } from 'src/_mock/student-data';

import { TableNoData } from '../table-no-data';
import { StudentTableRow } from '../student-table-row';
import { StudentTableHead } from '../student-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { StudentTableToolbar } from '../student-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import type { StudentProps } from '../student-table-row';
import { StudentFormModal } from '../student-form-modal';

export function StudentView() {
  const [students, setStudents] = useState(STUDENT_DATA);
  const [openModal, setOpenModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentProps | undefined>();

  const table = useTable();
  const [filterName, setFilterName] = useState('');

  const dataFiltered = applyFilter({
    inputData: students,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

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

  const handleSubmit = (formData: Omit<StudentProps, 'id'>) => {
    if (selectedStudent) {
      setStudents((prev) =>
        prev.map((s) => (s.id === selectedStudent.id ? { ...s, ...formData } : s))
      );
    } else {
      const newStudent = {
        id: `STD${String(students.length + 1).padStart(3, '0')}`,
        ...formData,
      };
      setStudents((prev) => [newStudent, ...prev]);
    }
    setOpenModal(false);
  };

  const handleDelete = (student: StudentProps) => {
    setStudents((prev) => prev.filter((s) => s.id !== student.id));
  };

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Students
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleAdd}
        >
          New Student
        </Button>
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
                  { id: 'actions', label: 'Actions', align: 'center' },
                ]}
              />
              <TableBody>
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

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, STUDENT_DATA.length)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
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
      />
    </DashboardContent>
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
