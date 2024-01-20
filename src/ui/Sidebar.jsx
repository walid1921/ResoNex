import { useStateContext } from '../contexts/ContextProvider'
import AsideBig from './AsideBig'
import AsideSmall from './AsideSmall'



function Sidebar({tasksData}) {
  const { activeMenu } = useStateContext();

  return (
    <>
      {activeMenu ?
       <AsideBig tasksData={tasksData}  /> 
       : 
       <AsideSmall />
       }
    </>
  )
}

export default Sidebar
