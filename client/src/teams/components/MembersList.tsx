export const MembersList = ({ members }) => {
  return members?.map((member) => {
    return (
      <div className={`${member.avtColor}  w-10 h-10 rounded-full flex justify-center cursor-pointer`}>
        <li className='m-auto text-tertiary text-lg font-bold'>{member.name[0]}</li>
      </div>
    );
  });
};
