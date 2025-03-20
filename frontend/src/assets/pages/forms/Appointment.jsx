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
import { Button } from '@/components/ui/button';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import Input_ from 'postcss/lib/input';
 
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
        description:'Clinic'
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
        <div className='ml-2 mr-2 pt-5 h-[90hv] rounded-md w-[450px]'>
          <h1 className='text-3xl text-center'>APPOINTMENT</h1>
          <div>
            <p>NAME OF THE PATIENT</p>
            <Input></Input>
          </div>
          <div>
            <p>PURPOSE</p>
            <Input></Input>
          </div>

          <div>

          </div>
          <div>
            <p>Time</p>
            <Input type="date"></Input>
          </div>
          <div>
            <p>Start</p>
            <Input type="time"></Input>
          </div>
          <div>
            <p>End</p>
            <Input type="time"></Input>
          </div>
          
          <div>
            <p>Description</p>
            <Input></Input>
          </div>
          <div className='flex'>
            <Button>PROCEED</Button>
            <Button>Reset</Button>
          </div>


          
        </div>
      </div>
  
    
  )
}
 
export default CalendarApp