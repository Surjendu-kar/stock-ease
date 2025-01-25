import { Box, TableCell, Skeleton, TableRow } from '@mui/material';

export function StudentTableSkeleton() {
  return (
    <>
      {[...Array(2)].map((_, index) => (
        <TableRow key={index}>
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
      ))}
    </>
  );
}
