import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react';
import { useState } from 'react';
import './index.css';
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
} from '@schedule-x/calendar';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import '@schedule-x/theme-default/dist/index.css';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import { createEventModalPlugin } from '@schedule-x/event-modal';

function CalendarApp() {
  const eventsService = useState(() => createEventsServicePlugin())[0];

  const calendar = useCalendarApp({
    views: [createViewDay(), createViewMonthGrid(), createViewMonthAgenda()],
    events: [
      {
        id: 'P-1',
        title: 'ChiChi',
        start: '2025-03-20 00:00',
        end: '2025-03-20 01:00',
        description: 'Clinic',
      },
    ],
    plugins: [
      createEventsServicePlugin(),
      createDragAndDropPlugin(),
      createEventModalPlugin(),
    ],
  });

  const initialFormData = {
    name: '',
    owner: '',
    contact: '',
    date: '',
    time: '',
    serviceType: '',
    description: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Appointment Scheduled:\nName: ${formData.name}\nOwner: ${formData.owner}\nContact: ${formData.contact}\nDate: ${formData.date}\nTime: ${formData.time}\nService Type: ${formData.serviceType}\nDescription: ${formData.description}`);
    setFormData(initialFormData); // Reset form fields
  };

  return (
    <div className='flex'>
      <ScheduleXCalendar calendarApp={calendar} />
      <div className='ml-2 mr-2 h-[90hv] rounded-md w-[450px] bg-white-500 shadow- p-4'>
        <h2 className='text-black text-lg font-bold mb-2'>Schedule Appointment</h2>
        <form onSubmit={handleSubmit}>
          <Label className='text-black'>Name:</Label>
          <Input type='text' name='name' value={formData.name} onChange={handleChange} required className='mb-2' />

          <Label className='text-black'>Owner Name:</Label>
          <Input type='text' name='owner' value={formData.owner} onChange={handleChange} required className='mb-2' />

          <Label className='text-black'>Contact:</Label>
          <Input type='text' name='contact' value={formData.contact} onChange={handleChange} required className='mb-2' />

          <Label className='text-black'>Date:</Label>
          <Input type='date' name='date' value={formData.date} onChange={handleChange} required className='mb-2' />

          <Label className='text-black'>Time:</Label>
          <Input type='time' name='time' value={formData.time} onChange={handleChange} required className='mb-2' />

          <Label className='text-black'>Service Type:</Label>
          <select name='serviceType' value={formData.serviceType} onChange={handleChange} required className='mb-2 w-full p-2 border rounded'>
            <option value=''>Select Service</option>
            <option value='Check Up'>Check Up</option>
            <option value='Grooming'>Grooming</option>
            <option value='Vaccination'>Vaccination</option>
            <option value='Deworming'>Deworming</option>
          </select>

          <Label className='text-black'>Description:</Label>
          <Input type='text' name='description' value={formData.description} onChange={handleChange} required className='mb-2' />

          <Button type='submit' className='mt-2 bg-green text-black-500'>Submit</Button>
        </form>
      </div>
    </div>
  );
}

export default CalendarApp;
