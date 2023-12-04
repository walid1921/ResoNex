import { createContext, useContext, useState } from 'react';


const StateContext = createContext();

const initialState = {
  userProfile: false,
  notification: false,
}

export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);

  const handleClick = (name) => {
    setIsClicked({ ...isClicked, [name]: !isClicked[name] });
  }

  // const toggleUserProfile = () => {
  //   setState({ ...state, userProfile: !state.userProfile });
  // }

  // const toggleNotification = () => {
  //   setState({ ...state, notification: !state.notification });
  // }

  return (
    <StateContext.Provider value={{ activeMenu, setActiveMenu, isClicked, setIsClicked, handleClick }}>
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);
