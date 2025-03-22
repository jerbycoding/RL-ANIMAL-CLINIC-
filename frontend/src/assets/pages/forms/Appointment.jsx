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

      <div>

   
        <div className='flex '>
          <div className='mr-10'>
            <ScheduleXCalendar calendarApp={calendar}  className="col-span-1"/>
          </div>

          <div className='mr-2  p-5 h-[90hv] rounded-md w-[400px] col-span-1 bg-white '>
            <h1 className='text-3xl text-center mb-5 font-bold'>APPOINTMENT</h1>
            <div>
              <p className='text-2xl font-bold'>NAME OF THE PATIENT</p>
              <Input></Input>
            </div>
            <div>
            <p className='text-2xl font-bold'>PURPOSE</p>
              <Input></Input>
            </div>
            <div>
            </div>
            <div>
            <p className='text-2xl font-bold'>TIME</p>
              <Input type="date"></Input>
            </div>
            <div>
            <p className='text-2xl font-bold'>START</p>
              <Input type="time"></Input>
            </div>
            <div>
            <p className='text-2xl font-bold'>END</p>
              <Input type="time"></Input>
            </div>
            

            <div className='flex mt-5 justify-between'>
              <Button>PROCEED</Button>
              <Button>Reset</Button>
            </div>
          </div>
        
        </div>

      </div>
    
  )
}
 
export default CalendarApp