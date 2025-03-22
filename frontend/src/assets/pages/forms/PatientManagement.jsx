import React,{useState} from 'react'
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import { MdPets } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { Label } from '@/components/ui/label';
import { IoExitSharp } from "react-icons/io5";
import { FaDog } from "react-icons/fa";
import { RiResetLeftFill } from "react-icons/ri";
function PatientManagement(){
  const [openForm, setOpenForm] = useState(false);
  return (
    <div >{openForm ? (
    <div>
        <div className="flex justify-between items-center pb-5 ">
        <h1 className='text-3xl font-bold'>Patient Form</h1>
        <Button onClick={()=>{setOpenForm(false)}}><IoExitSharp className='text-3xl ' />Exit</Button>
        </div>
        
        <div className=''>
            <div className=' bg-white p-5 rounded-lg shadow-2xl'>
                <h1 className='text-center text-3xl font-bold'>OWNER'S FORM</h1>
                <div className='grid grid-cols-3 gap-5'>
                    <Label>
                        <p>Name</p>
                        <Input></Input>
                    </Label>
                    <Label>
                        <p>Address</p>
                        <Input></Input>
                    </Label>
                    <Label>
                        <p>Contact Number</p>
                        <Input></Input>
                    </Label>
                </div>
            </div>
            <div className='grid grid-cols-3 bg-white shadow-2xl mt-5 rounded-lg p-5 gap-5'>
                <h1 className='font-bold text-3xl pt-2 text-center col-span-3'>PATIENT'S FORM</h1>
                <Label>
                    NAME*
                    <Input></Input>
                </Label>
                <Label>
                    Date of Birth
                    <Input type="date"></Input>
                </Label>
                <Label>
                    SEX
                    <Input></Input>
                </Label>
                <Label>
                    BREED
                    <Input></Input>
                </Label>
                <Label>
                    SPP
                    <Input></Input>
                </Label>
                <Label>
                    COLOR
                    <Input></Input>
                </Label>
                <div className='col-span-2 grid grid-cols-3 gap-5 bg-slate-200 px-5 rounded-lg'>
                        <h1 className='text-center font-bold text-3xl col-span-3'>PHYSICAL EXAM</h1>
                        <Label>
                            GENERAL CONDITION 
                            <Input></Input>
                        </Label>
                        <Label>
                            GENERAL ATTITUDE
                            <Input></Input>
                        </Label>
                        <Label>
                            HYDRATION 
                            <Input></Input>
                        </Label>
                        <Label>
                            MUCOUS 
                            <Input></Input>
                        </Label>
                        <Label>
                            HEAD/NECK
                            <Input></Input>
                        </Label>
                        <Label>
                            EYES 
                            <Input></Input>
                        </Label>
                        <Label>
                            EARS  
                            <Input></Input>
                        </Label>
                        <Label>
                            GASTROINTESTINAL
                            <Input></Input>
                        </Label>
                        <Label>
                            UROGENITALS
                            <Input></Input>
                        </Label>
                        <Label>
                        RESPIRATORY 
                            <Input></Input>
                        </Label>
                        <Label>
                        CIRCULATORY 	
                            <Input></Input>
                        </Label>
                        
                        <Label>
                        MUSCUCOSKELETO 
                            <Input></Input>
                        </Label>
                        <Label>
                        LYMPH NODES 
                            <Input></Input>
                        </Label>
                        <Label>
                        VENOUS RETURN 
                            <Input></Input>
                        </Label>
                        <Label>
                        INTEGUMENTARY/SKIN
                        <Input></Input>
                        </Label>
                </div>
                <div className='bg-slate-100 px-5 shadow-xl'>
                    <h1 className='text-center text-3xl font-bold mb-5'>ABNORMAL DESCRIPTION</h1>
                    <div className='grid grid-cols-2 gap-5'>
                        <Label>
                            WEIGHT
                            <Input></Input>
                        </Label>
                        <Label>
                            TEMP
                            <Input></Input>
                        </Label>
                        <Label>
                            RESP
                            <Input></Input>
                        </Label>
                        <Label>
                            PULSE
                            <Input></Input>
                        </Label>
                    </div>

                </div>
                <div className=' col-span-3 grid grid-cols-3 gap-5'>
                <Label>
                    HEART WORM SCREENING
                    <Input></Input>
                </Label>
                <Label>
                    KENNEL COUGH VACC
                    <Input></Input>
                </Label>
                <Label>
                    MYCONPORUM VACC
                    <Input></Input>
                </Label>
                <Label>
                DENTAL PYOPHYLAXIS 
                    <Input></Input>
                </Label>
                </div>
                <div className='bg-blue-200 col-span-3 grid grid-cols-3 gap-5 px-5 rounded-lg'>	
                    <h1 className='text-center text-3xl font-bold col-span-3'>LABARATORY/ DIAGNOSTIC TEST/</h1>
                    <Label>
                    BLOOD EXAM 
                    <Input></Input>
                </Label>
                <Label>
                DISTEMPER TEST
                    <Input></Input>
                </Label>
                <Label>
                EAR SWABBING
                    <Input></Input>
                </Label>
                <Label>
                EHRLICHIA TEST 
                    <Input></Input>
                </Label>
                <Label>
                HEARTWORM TEST
                    <Input></Input>
                </Label>
                <Label>
                PARVO TEST
                    <Input></Input>
                </Label>
                <Label>
                SKIN SCRAPPING
                    <Input></Input>
                </Label>
                <Label>
                STOOL EXAM
                    <Input></Input>
                </Label>
                <Label>
                ULTRA SOUND
                    <Input></Input>
                </Label>
                <Label>
                URINE EXAM 
                    <Input></Input>
                </Label>
                <Label>
                VAGINAL SMEAR 
                    <Input></Input>
                </Label>
                <Label>
                X RAYS 
                    <Input></Input>
                </Label>
                </div>
            </div>
            <div className='float-right mt-5 flex gap-5'><Button className="p-5"><RiResetLeftFill /> Reset</Button><Button className="p-5"><FaDog />Save</Button></div>
        </div>
    </div>):(<div>
        <div>
             <h1 className='text-3xl font-bold mb-5'>Patient Management</h1>
        </div>
        <div className='flex justify-between items-center'>
            
            <div className="relative w-[800px]">
                <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <Input
                className="pl-10 w-full bg-white border-gray-300"
                 placeholder="Search Name or ID"/>
            </div>
            <div>
                <Button onClick={()=>{setOpenForm(true)}}><MdPets /> Add</Button>
            </div>
        </div>

       <div className='mt-5'>
       <div class="relative shadow-md sm:rounded-lg h-[650px] ">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400  overflow-y-auto">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400  ">
            <tr>
                <th scope="col" class="px-6 py-3 text-center">
                    Patient ID
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                    Name
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                    Contact Number
                </th>

                <th scope="col" class="px-6 py-3 text-center">
                    Action
                </th>
                
            </tr>
        </thead>
        <tbody>
            
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                   PDID-001
                </th>
                <td class="px-6 py-4 text-center">
                    CHICHI
                </td>
                <td class="px-6 py-4 text-center">
                    0994-607-2368
                </td>

                <td class="px-6 py-4 text-center">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>

            
        </tbody>
    </table>
    
</div>

</div>
<div className="flex flex-row items-center justify-between">    
    <span className="text-sm text-gray-700 dark:text-gray-300">       
        Showing <span className="font-semibold text-gray-900 dark:text-white">1</span> to 
        <span className="font-semibold text-gray-900 dark:text-white">10</span> of 
        <span className="font-semibold text-gray-900 dark:text-white">100</span> Entries   
    </span>   
    <div className="inline-flex mt-2 xs:mt-0 items-center">        
        <button className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">         
            <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">           
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
            </svg>         
            Prev     
        </button>     
        <button className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white ml-2">         
            Next         
            <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">         
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>     
        </button>   
    </div> 
</div>



    </div>) }
        

</div>
  )
}

export default PatientManagement
