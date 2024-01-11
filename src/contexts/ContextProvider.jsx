import { createContext, useContext, useState } from 'react';


const StateContext = createContext();

const initialState = {
  userProfile: false,
  notification: false,
}

export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [calendarData, setCalendarData] = useState([]);
  const [tasksData, setTasksData] = useState([]);


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
    <StateContext.Provider value={{ activeMenu, setActiveMenu, isClicked, setIsClicked, handleClick, isLoading, setIsLoading, error, setError, calendarData, setCalendarData, tasksData, setTasksData}}>
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);
