import { useState, useEffect } from 'react';
import { ScheduleComponent, Day, Week, Month, Agenda, Inject} from '@syncfusion/ej2-react-schedule';
import Spinner from '../ui/Spinner';
import toast from 'react-hot-toast';


// // const scheduleData = [
// //   {
// //     Id: 1,
// //     Subject: 'Explosion of Betelgeuse Star',
// //     Location: 'Space Center USA',
// //     StartTime: '2023-12-10T04:00:00.000Z',
// //     EndTime: '2023-12-10T05:30:00.000Z',
// //     CategoryColor: '#1aaa55',
// //   },
// //   {
// //     Id: 2,
// //     Subject: 'Blue Moon Eclipse',
// //     Location: 'Space Center USA',
// //     StartTime: '2023-12-12T04:00:00.000Z',
// //     EndTime: '2023-12-12T05:30:00.000Z',
// //     CategoryColor: '#7fa900',
// //   },
// // ];



// || 'http://localhost:5000/api';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


const Calendar = () => {
  const [calendarData, setCalendarData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/events`);
      if (!response.ok) {
        throw new Error('Error loading calendar data');
      }
      const data = await response.json();
      setCalendarData(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleting = async (args) => {
    if (args.requestType === 'eventRemove') {
      try {
        const response = await fetch(`${BACKEND_URL}/events/${args.data[0]._id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error deleting event');
        }

        toast.success('Event deleted successfully');
        fetchData(); // Refetch data after deletion
      } catch (error) {
        toast.error('Error deleting event');
        console.error(error);
      }
    }
  };

  const handleCreating = async (args) => {
    if (args.requestType === 'eventCreate') {
      try {
        const response = await fetch(`${BACKEND_URL}/events`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...args.data[0],
          }),
        });
  
        if (!response.ok) {
          throw new Error('Error creating event');
        }
  
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
  }, []); // Fetch data on component mount

  if (isLoading) return <Spinner />;
  if (error) return <div>Error loading calendar data</div>;

  return (
    <div>
      <div className='flex flex-col gap-2 mb-7'>
        <p className='text-md text-slate-500'>App</p>
        <h1 className='text-xl'>Calendar</h1>
      </div>

      <ScheduleComponent
        height='525px'
        eventSettings={{
          dataSource: calendarData,
          fields: {
            id: 'Id',
            subject: { name: 'Subject' },
            location: { name: 'Location' },
            startTime: { name: 'StartTime' },
            endTime: { name: 'EndTime' },
            description: { name: 'Description' },
            categoryColor: { name: 'CategoryColor' },
          },
          allowDeleting: true,
        }}
        selectedDate={new Date()}
        startHour='00:00' endHour='24:00'
        currentView='Day'
        cssClass='schedule-views-config rounded-[14px]'
        actionBegin={(args) => {
          handleDeleting(args);
          handleCreating(args);
        }}
      >
        <Inject services={[Day, Week, Month, Agenda]} />
      </ScheduleComponent>
    </div>
  );
};

export default Calendar;

