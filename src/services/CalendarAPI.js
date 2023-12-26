// CalendarAPI.js
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

// const scheduleData = [
//   {
//     Id: 1,
//     Subject: 'Explosion of Betelgeuse Star',
//     Location: 'Space Center USA',
//     StartTime: '2023-12-10T04:00:00.000Z',
//     EndTime: '2023-12-10T05:30:00.000Z',
//     Description: 'Something excited',
//   },
// ];


// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const BACKEND_URL = 'http://localhost:5001/api';


const useCalendarAPI = () => {
  const [calendarData, setCalendarData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  

  //! Fetch data from the backend
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/events`);
      setCalendarData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

   //! Delete event from the backend
   const handleDeleting = useCallback(
    async (args) => {
      if (args.requestType === 'eventRemove') {
        try {


          // Delete individual events
          await axios.delete(`${BACKEND_URL}/events/${args.data[0]._id}`);
          toast.success('Event deleted successfully');
          fetchData(); // Refetch data after deletion
          
        } catch (error) {
          toast.error('Error deleting event');
          console.error(error);
        }
      }
    },
    [fetchData]
  );

  //! Create event in the backend
  const handleCreating = async (args) => {
    if (args.requestType === 'eventCreate') {
      try {
        await axios.post(`${BACKEND_URL}/events`, { ...args.data[0] });
        toast.success('Event created successfully');
        fetchData(); // Refetch data after creation
      } catch (error) {
        toast.error('Error creating event');
        console.error(error);
      }
    }
  };



  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // useEffect(() => {
  //   let latestEvent = null;
  //   let currentTime = new Date().getTime();
  
  //   for (const event of calendarData) {
  //     const eventStartTime = new Date(event.StartTime).getTime();
  
  //     // Get the date components of eventStartTime and currentTime
  //     const eventStartDate = new Date(event.StartTime).toLocaleDateString();
  //     const currentStartDate = new Date().toLocaleDateString();
  
  //     if (currentTime > eventStartTime && eventStartDate === currentStartDate) {
  //       console.log(event.StartTime);
  //       console.log('Current time is bigger than the latest event time and on the same day.');
  //       alert('Current time matches the time of the latest event on the same day!');
  //     } else {
  //       console.log('Latest event time is either bigger than the current time or on a different day.');
  //     }
  //   }
  // }, [calendarData]);

  useEffect(() => {
  const intervalId = setInterval(async () => {
    let isAlertTriggered = false;
    let currentTime = new Date().getTime();

    for (const event of calendarData) {
      const eventStartTime = new Date(event.StartTime).getTime();

      // Get the date components of eventStartTime and currentTime
      const eventStartDate = new Date(event.StartTime).toLocaleDateString();
      const currentStartDate = new Date().toLocaleDateString();

      if (currentTime > eventStartTime && eventStartDate === currentStartDate) {
        console.log(event.StartTime);
        console.log('Current time is bigger than the latest event time and on the same day.');
      
        const confirmation = window.confirm('Current time matches the time of the latest event on the same day! Do you want to delete the event?');
      
        if (confirmation) {
          // Call handleDeleting if the user confirms
          await handleDeleting({ requestType: 'eventRemove', data: [event] });
          
        }
        isAlertTriggered = true;
        break;
      } else {
        console.log('Latest event time is either bigger than the current time or on a different day.');
      }
    }

    if (isAlertTriggered) {
      clearInterval(intervalId);
    }
  }, 5000); // 5000 milliseconds = 5 seconds

  // Clear the interval when the component unmounts or when calendarData changes
  return () => clearInterval(intervalId);
}, [calendarData, handleDeleting]);


  return {
    calendarData,
    isLoading,
    error,
    fetchData,
    handleDeleting,
    handleCreating,
  };
};

export default useCalendarAPI;
