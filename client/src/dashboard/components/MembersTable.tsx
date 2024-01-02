import { useTable } from "react-table";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useDashboard } from "../../hooks/useDashboard";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

export const MembersTable = () => {
  const { activeTeam, membersActiveTeam, startGettingMembers, startDeletingMember } = useDashboard();
  const handleAccept = (userId, memberName) => {
    startDeletingMember(userId, activeTeam.id, memberName);
  };

  const handleCancel = () => toast.error("Cancelled");

  const startDeletingMemberInComponent = (id, name) => {
    console.log(id);
    toast.info(
      <div className='flex flex-col'>
        <p className='font-poppins mb-2'>Are you sure deleting {name} from this team?</p>
        <div className='flex space-x-2'>
          <button onClick={handleCancel} className='btn-secondary w-2/3 space-x-2 p-1 font-poppins rounded-md'>
            ❌
          </button>

          <button onClick={() => handleAccept(id, name)} className='btn-primary w-2/3 p-1 font-poppins rounded-md'>
            ✅
          </button>
        </div>
      </div>
    );
  };
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "first_name",
      },
      {
        Header: "Email",
        accessor: "email",
      },

      {
        Header: "Delete",
        accessor: "delete",
        Cell: ({ row }) => (
          <span className='text-red-600 cursor-pointer  text-lg lg:text-2xl'>
            <FiTrash2 onClick={() => startDeletingMemberInComponent(row.original.id, row.original.first_name)} />
       
          </span>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    startGettingMembers(activeTeam.id);
  }, [membersActiveTeam.length]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: membersActiveTeam || [],
  });
  return (
    <div className='w-full overflow-x-auto max-h-96 overflow-y-scroll my-12'>
      <table {...getTableProps()} className='table-auto rounded text-left border-2 border-primary/30'>
        <thead className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className=''>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className='justify-start border-b flex-row h-20 my-auto mx-auto border-blue-gray-100 bg-blue-gray-50 px-4'
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className=''>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className='odd:bg-secondary/20 w-fit h-20 my-auto mx-auto justify-start px-4'>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className='lg:w-3/4 lg:px-4'>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
