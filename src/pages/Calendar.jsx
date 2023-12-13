import { ScheduleComponent, Day, Week, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import Spinner from '../ui/Spinner';
import  useCalendarAPI  from '../services/CalendarAPI';

const Calendar = () => {
  const {
    calendarData,
    isLoading,
    error,
    handleDeleting,
    handleCreating,
  } = useCalendarAPI();



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
        showTimeIndicator={false}
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
        startHour='00:00'
        endHour='24:00'
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