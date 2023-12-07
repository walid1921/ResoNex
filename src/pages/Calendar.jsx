import { ScheduleComponent, Day, Week, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import Spinner from '../ui/Spinner';
import { deleteCalendar, getCalendar } from '../services/apiCalendar';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';



// const scheduleData = [
//   {
//     Id: 1,
//     Subject: 'Explosion of Betelgeuse Star',
//     Location: 'Space Center USA',
//     StartTime: '2023-12-10T04:00:00.000Z',
//     EndTime: '2023-12-10T05:30:00.000Z',
//     CategoryColor: '#1aaa55',
//   },
//   {
//     Id: 2,
//     Subject: 'Coding Class',
//     Location: 'Newyork City',
//     StartTime: '2023-12-11T06:30:00.000Z',
//     EndTime: '2023-12-11T08:30:00.000Z',
//     CategoryColor: '#357cd2',
//   },
//   {
//     Id: 3,
//     Subject: 'Blue Moon Eclipse',
//     Location: 'Space Center USA',
//     StartTime: '2023-12-12T04:00:00.000Z',
//     EndTime: '2023-12-12T05:30:00.000Z',
//     CategoryColor: '#7fa900',
//   },
//   {
//     Id: 4,
//     Subject: 'Meteor Showers in 2023',
//     Location: 'Space Center USA',
//     StartTime: '2023-12-13T07:30:00.000Z',
//     EndTime: '2023-12-13T09:00:00.000Z',
//     CategoryColor: '#ea7a57',
//   },

// ];



const Calendar = () => {

  // const { isLoading, setIsLoading, error, setError, calendarData, setCalendarData } = useStateContext()

  //! Get Calendar Data 
  const { isLoading, data: calendarData, error } = useQuery({
    queryKey: ['calendar'],
    queryFn: getCalendar,
  });
  //! Get Calendar Data


  //! Delete Event 
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: id => deleteCalendar(id),
    onSuccess: () => {

      toast.success('Event Deleted Successfully')
      queryClient.invalidateQueries({
        queryKey: ['calendar'],
      });
    },
    onError: (error) =>  toast.error(error.message),
  })


  const deleteEvent = async (eventId) => {
    try {
      await mutate(eventId); // Assuming deleteCalendar accepts the ID directly
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };


  const handleDeleting = (args) => {
    if (args.requestType === 'eventRemove') {
      const eventId = args.data[0].id;
      deleteEvent(eventId);
    }
  };
  //! Delete Event 


  



  if (isLoading) return <Spinner />



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
            categoryColor: { name: 'CategoryColor' }
          },
          allowEditing: true,
          allowDeleting: true
        }}
        selectedDate={new Date()}
        startHour='00:00' endHour='24:00'
        currentView='Day'
        cssClass='schedule-views-config rounded-[14px]'
        actionBegin={handleDeleting}
      >

        <Inject services={[Day, Week, Month, Resize, DragAndDrop, Agenda]} />
      </ScheduleComponent>


    </div>
  )
}

export default Calendar