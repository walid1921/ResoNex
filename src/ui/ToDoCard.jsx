import { TooltipComponent } from "@syncfusion/ej2-react-popups"
import { HiOutlinePencil, HiOutlineMinusSm } from "react-icons/hi"
import Modal from 'react-modal'; //npm install react-modal
import SecondaryBtn from "./buttons/SecondaryBtn";
import { useState } from "react";





let TooltipAnimation = {
  open: { effect: 'FadeIn', duration: 300, delay: 0 },
};



function ToDoCard({id, title, description, date, status, handleDeleteTask }) {

  const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);


  const truncatedDescription = description.length >= 20 ? `${description.slice(0, 13)}...` : description;


  const openDeleteTaskModal = () => {
    setIsDeleteTaskModalOpen(true);
  }

  const closeDeleteTaskModal = () => {
    setIsDeleteTaskModalOpen(false);
  }

  return (
    <div className={`flex flex-col w-[45%] h-[80px] bg-[rgba(148,163,184,0.26)] rounded-md px-4 py-2 border ${status === 'Done' ? 'border-[#5fcf65a3]' : 'border-[#c4b131a2]'}`}>
      <div className="flex items-center justify-between">
        <h4>{title}</h4>
        <div className="flex gap-2">


          <TooltipComponent content='Edit' position='TopCenter' offsetY={-5} animation={TooltipAnimation}>
            <button className=" p-1 bg-[#94a3b866] hover:bg[#94a3b8b5] rounded-full">
              <HiOutlinePencil size={7} />
            </button>
          </TooltipComponent>


          <TooltipComponent content='Delete' position='TopCenter' offsetY={-5} animation={TooltipAnimation}>
            <button className="bg-[#ff4d4dad] hover:bg-[#c6141d9d] p-1 rounded-full" onClick={openDeleteTaskModal}>
              <HiOutlineMinusSm size={7} />
            </button>
          </TooltipComponent>

          {/* Delete a task */}

          <Modal
            isOpen={isDeleteTaskModalOpen}
            onRequestClose={closeDeleteTaskModal}
            contentLabel="Delete Task"
            style={{
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(2px)'
              },
              content: {
                background: 'rgba(0, 0, 0, 0.6)',
                borderRadius: '16px',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(5px)',
                WebkitBackdropFilter: 'blur(5px)',
                border: '1px solid rgba(0, 0, 0, 0.3)',
                color: '#fff',
                width: '25%',
                height: '18%',
                margin: 'auto',
              },
            }}>
            <div className="flex flex-col h-full">
              <h2 className="flex justify-center mt-3">Are you sure you want to delete this task?</h2>
              <div className="flex justify-center items-center my-8 gap-3">
                <button className="border border-[#ff3333] hover:bg-[#ff4d4dde] bg-[#ff4d4dad] px-4 py-2 rounded-md text-sm transition-all ease-in duration-150 hover:opacity-75 gap-2" onClick={() => handleDeleteTask(id)}> Delete</button>
                <SecondaryBtn onClick={closeDeleteTaskModal} text={'Cancel'} />
              </div>
            </div>
          </Modal>



        </div>
      </div>
      <div className="text-sm text-slate-400">{truncatedDescription}</div>
      <div className="flex items-center gap-2 justify-end">
        <span className="text-[10px] text-slate-400">{date}</span>


        <TooltipComponent content={status} position='TopCenter' offsetY={-5} animation={TooltipAnimation}>
          <div className={`w-[20px] h-[4px] rounded-sm cursor-pointer ${status === 'Done' ? 'bg-[#5fcf65a3]' : (status === 'Pending' ? 'bg-[#c4b131a2] animate-lightInfinite' : '')}`}></div>
        </TooltipComponent>


      </div>

    </div>
  )
}

export default ToDoCard
