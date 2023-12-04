import { useStateContext } from '../contexts/ContextProvider'
import AsideBig from './AsideBig';
import SmallNav from "./AsideSmall";


function Sidebar() {
  const { activeMenu } = useStateContext();

  return (
    <>
      {activeMenu ? <AsideBig /> : <SmallNav />}
    </>
  )
}

export default Sidebar
