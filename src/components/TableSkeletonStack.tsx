import { Box, Skeleton, Stack } from "@chakra-ui/react";

function TableSkeletonStack() {
  const rows = 5; // Number of rows in the skeleton
  const columns = 6; // Number of columns in the skeleton

  return (
    <Box p={2} borderRadius="md" overflowX="auto">
      {/* Table Header Skeleton */}
      <Stack direction="row" spacing={4} mb={4}>
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton key={index} height="30px" width="100%" />
        ))}
      </Stack>

      {/* Table Body Skeleton */}
      <Stack spacing={3}>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <Stack direction="row" spacing={4} key={rowIndex}>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Skeleton key={colIndex} height="30px" width="100%" />
            ))}
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

export default TableSkeletonStack;
