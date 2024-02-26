import React, { useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useDashboard } from "../../hooks/useDashboard";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { toast } from "react-toastify";
import { useAuthSlice } from "../../hooks/useAuthSlice";

export const MembersTable = () => {
  const { activeTeam, membersActiveTeam, startGettingMembers, startDeletingMember, startInvitingMember } = useDashboard();
  const theme = localStorage.getItem("theme");
  const { user } = useAuthSlice();
  const handleAccept = (userId, memberName) => {
    startDeletingMember(userId, activeTeam._id, memberName);
  };

  const handleCancel = () => toast.error("Cancelled");
  const handleInvite = (memberId, memberName) => {
    startInvitingMember(memberId, memberName);
  };
  const startDeletingMemberInComponent = (id, name) => {
    console.log(id);
    toast.info(
      <div className='flex flex-col'>
        <p className='font-poppins mb-2'>Are you sure deleting {name} from this team?</p>
        <div className='flex space-x-2'>
          <Button onClick={handleCancel} variant='contained' color='secondary'>
            ❌
          </Button>
          <Button onClick={() => handleAccept(id, name)} variant='contained' color='primary'>
            ✅
          </Button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    startGettingMembers(activeTeam._id);
  }, [membersActiveTeam.length]);

  return (
    <TableContainer>
      <Table className='font-poppins'>
        <TableHead>
          <TableRow>
            <TableCell>Avatar</TableCell>
            <TableCell>Name</TableCell>

            {user.role ? (
              <>
                {" "}
                <TableCell>Email</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Delete</TableCell>
              </>
            ) : (
              ""
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {membersActiveTeam.map((member) => (
            <TableRow key={member._id}>
              <TableCell>
                <div className='flex items-center'>
                  <div className={`rounded-full h-8 w-8 flex items-center justify-center mr-2 ${member.avtColor}`}>
                    <span className='text-tertiary font-bold'> {member.name[0]}</span>
                  </div>
                </div>
              </TableCell>

              <TableCell>{member.name}</TableCell>

              {user.role ? (
                <>
                  {" "}
                  <TableCell>{member.email}</TableCell>
                  <TableCell>
                    {!member.isRegistered ? (
                      <Button onClick={() => handleInvite(member._id, member.name)} variant='contained' color='primary'>
                        Invite
                      </Button>
                    ) : (
                      "Registered"
                    )}
                  </TableCell>
                  <TableCell>
                    <span className='text-red-600 cursor-pointer text-lg lg:text-2xl'>
                      <FiTrash2 onClick={() => startDeletingMemberInComponent(member._id, member.name)} />
                    </span>
                  </TableCell>
                </>
              ) : (
                ""
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MembersTable;
