import { useStateContext } from '../contexts/ContextProvider'
import AsideBig from './AsideBig'
import AsideSmall from './AsideSmall'



function Sidebar() {
  const { activeMenu } = useStateContext();

  return (
    <>
      {activeMenu ?
       <AsideBig /> 
       : 
       <AsideSmall />
       }
    </>
  )
}

export default Sidebar
