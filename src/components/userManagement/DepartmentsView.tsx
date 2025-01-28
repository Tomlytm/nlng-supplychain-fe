import { Skeleton, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'
import { MdAdd } from 'react-icons/md';
import { EmptyState } from '../utils';
import { IDept } from '@/models/user.model';
type DepartmentsViewProps = {
    departments: IDept[];
    loading: boolean;
}
function DepartmentsView({ departments, loading }: DepartmentsViewProps) {
    return (
        <div>
            {loading ? (
                <div className="flex flex-col gap-3">
                    {[1, 2, 3, 4, 5, 6].map((item, index) => (
                        <Skeleton
                            height={10}
                            width={"100%"}
                            borderRadius={12}
                            key={index}
                        />
                    ))}
                </div>
            ) : departments?.length < 1 ? (
                <EmptyState
                    heading="No Department Found"
                    subText="Start by creating a new role"
                    buttonText="New Role"
                    icon={<MdAdd />}
                    onClick={() => {
                        // openRoleModal();
                    }}
                />
            ) : (
                <TableContainer>
                    <Table variant='simple'>
                        <TableCaption>Imperial to metric conversion factors</TableCaption>
                        <Thead >
                            <Tr className='text-sm bg-white'>
                                <Th>Id</Th>
                                <Th>Department Name</Th>
                                <Th>Abbreviation</Th>
                            </Tr>
                        </Thead>
                        <tbody className='bg-white'>
                            {departments?.map((item, i) => (
                                <Tr className='text-sm bg-[#F2F2F2]' key={i}>
                                    <Td>{item.id}</Td>
                                    <Td>{item.departmentName}</Td>
                                    <Td >{item.abbreviation}</Td>
                                </Tr>
                            ))}
                        </tbody>
                    </Table>
                </TableContainer>
            )
            }
        </div>
    )
}

export default DepartmentsView