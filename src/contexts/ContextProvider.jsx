import { createContext, useContext, useState } from 'react';


const StateContext = createContext();

const initialState = {
  userProfile: false,
  notification: false,
}

export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  // const [state, setState] = useState(initialState);

  // const toggleUserProfile = () => {
  //   setState({ ...state, userProfile: !state.userProfile });
  // }

  // const toggleNotification = () => {
  //   setState({ ...state, notification: !state.notification });
  // }

  return (
    <StateContext.Provider value={{ activeMenu, setActiveMenu }}>
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);
