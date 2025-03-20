import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {useState, useEffect} from 'react';
import './index.css'
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
 
import '@schedule-x/theme-default/dist/index.css'

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import { createEventModalPlugin } from '@schedule-x/event-modal';
 
function CalendarApp() {
  const eventsService = useState(() => createEventsServicePlugin())[0]
 
  const calendar = useCalendarApp({
    views: [createViewDay(), createViewMonthGrid(), createViewMonthAgenda()],
    events: [
      {
        id: 'P-1',
        title: 'ChiChi',
        start: '2025-03-20 00:00',
        end: '2025-03-20 01:00',
        description:'Clinic';
      }
    
    ],

  
    plugins: [
      createEventsServicePlugin(),
      createDragAndDropPlugin(),
      createEventModalPlugin(),
    ]
  })
 

 
  return (

      
      <div className='flex'>
        <ScheduleXCalendar calendarApp={calendar}  />
        <div className='ml-2 mr-2 h-[90hv] rounded-md w-[450px] bg-green-500'>
         s
        </div>
      </div>
  
    
  )
}
 
export default CalendarApp