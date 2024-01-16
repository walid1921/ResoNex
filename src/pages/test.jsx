// import { ScheduleComponent, Day, Week, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
// import Spinner from '../ui/Spinner';
// import { useState, useEffect } from 'react';
// import { useQueryClient } from '@tanstack/react-query';
// import toast from 'react-hot-toast';

// const Calendar = () => {
//   const [calendarData, setCalendarData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const queryClient = useQueryClient();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/events');
//         if (!response.ok) {
//           throw new Error('Error loading calendar data');
//         }
//         const data = await response.json();
//         setCalendarData(data);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleDeleting = (args) => {
//     if (args.data && args.data.length > 0) {
//       const eventId = args.data[0]._id; // Use _id instead of Id
//       // If using Syncfusion's built-in confirmation, no need to manually trigger deletion
//       // Just handle any post-deletion tasks as needed
//       queryClient.invalidateQueries('calendarData');
//       toast.success('Event deleted successfully');
//     } else {
//       console.error('Invalid data for deletion:', args.data);
//     }
//   };
//   if (isLoading) return <Spinner />;
//   if (error) return <div>Error loading calendar data</div>;

//   return (
//     <div>
//       <div className='flex flex-col gap-2 mb-7'>
//         <p className='text-md text-slate-500'>App</p>
//         <h1 className='text-xl'>Calendar</h1>
//       </div>

//       <ScheduleComponent
//         height='525px'
//         eventSettings={{
//           dataSource: calendarData,
//           fields: {
//             id: 'Id',
//             subject: { name: 'Subject' },
//             location: { name: 'Location' },
//             startTime: { name: 'StartTime' },
//             endTime: { name: 'EndTime' },
//             categoryColor: { name: 'CategoryColor' }
//           },
//           allowEditing: true,
//           allowDeleting: true
//         }}
//         selectedDate={new Date()}
//         startHour='00:00' endHour='24:00'
//         currentView='Day'
//         cssClass='schedule-views-config rounded-[14px]'
//         actionBegin={handleDeleting}
//       >
//         <Inject services={[Day, Week, Month, Resize, DragAndDrop, Agenda]} />
//       </ScheduleComponent>
//     </div>
//   );
// };

// export default Calendar;
