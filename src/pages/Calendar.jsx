import { ScheduleComponent, ViewDirective, ViewsDirective, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop, HeaderRowsDirective, HeaderRowDirective, TimelineViews } from '@syncfusion/ej2-react-schedule';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';



import { scheduleData } from '../data/dummy'


const Calendar = () => {
  return (
    <div>
      <div className='flex flex-col gap-2 mb-7'>
        <p className='text-md text-slate-500'>App</p>
        <h1 className='text-xl'>Calendar</h1>
      </div>
      <ScheduleComponent
        height='525px'
        eventSettings={{ 
          dataSource: scheduleData,  
          fields: {
          id: 'Id',
          subject: { name: 'Subject' },
          location: { name: 'Location' },
          startTime: { name: 'StartTime' },
          endTime: { name: 'EndTime' },
          categoryColor: { name: 'CategoryColor' } // Ensure this matches your data structure
        } }}
        selectedDate={new Date()}
        startHour='00:00' endHour='24:00'
        className='rounded-md '
        currentView='Day'
      >

      

        <Inject services={[Day, Week, Month, WorkWeek, Resize, DragAndDrop, Agenda]} />
      </ScheduleComponent>
    </div>
  )
}

export default Calendar