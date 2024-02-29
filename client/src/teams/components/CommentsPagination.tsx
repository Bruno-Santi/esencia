import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Pagination } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const CommentsPagination = ({ comments }) => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const commentsPerPage = 4;
  const reverseComments = [...comments].reverse();
  const handleChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * commentsPerPage;
  const endIndex = startIndex + commentsPerPage;
  const commentsToShow = reverseComments.slice(startIndex, endIndex);

  return (
    <div>
      <ul>
        {commentsToShow.map((comment, index) => (
          <div className='flex flex-col font-poppins' key={index}>
            <div className='border rounded-md p-3 ml-3 my-3'>
              <div className='flex gap-3 items-center'>
                <div className={`${comment.member.avtColor} object-cover w-8 h-8 rounded-full border-2 flex justify-center cursor-pointer my-auto`}>
                  <span className='text-tertiary my-auto'>{comment.member.name[0]}</span>{" "}
                </div>
                <h3 className='font-normal'>{comment.member.name}</h3>
              </div>
              <p className='text-gray-600 mt-2 w-[350px] break-words'>{comment.comment}</p>
            </div>
          </div>
        ))}
      </ul>
      {commentsToShow.length > 0 && (
        <div className={classes.root}>
          <Pagination count={Math.ceil(comments.length / commentsPerPage)} page={page} onChange={handleChange} color='primary' />
        </div>
      )}
    </div>
  );
};

export default CommentsPagination;
