import { DragDropContext } from "react-beautiful-dnd";

export const Home = () => {
  return (
    <div>
      <DragDropContext>
        <h1>Progress Board</h1>
        <div className='flex justify-between items-center flex-row'></div>
      </DragDropContext>
    </div>
  );
};
