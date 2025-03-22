import React from 'react'
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import { MdPets } from "react-icons/md";
import { IoSearch } from "react-icons/io5";

const InventoryTable = () => {
  return(
    <div> 
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
                    <Button><MdPets /> Medicine</Button>
                    <Button><MdPets /> Food</Button>
                    <Button><MdPets /> Equipment</Button>
                    <Button><MdPets /> Supplies</Button>
                    <Button><MdPets /> Other</Button>
                    <Button><MdPets /> Add</Button>
                </div>
            </div>
    
           <div className='mt-5'>
    
    
           <div className="relative shadow-md sm:rounded-lg h-[650px] ">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400  overflow-y-auto">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400  ">
                <tr>
                    <th scope="col" className="px-6 py-3 text-center">
                        Name
                    </th>

                    <th scope="col" className="px-6 py-3 text-center">
                        Batch Number
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                        Quantity
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                        Unit
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                        Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                        Stock
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                        Action
                    </th>

                    
                </tr>
            </thead>
            <tbody>
                
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                       DOG FOOD
                    </th>

                    <td className="px-6 py-4 text-center">
                      DEC-21
                    </td>
                    <td className="px-6 py-4 text-center">
                        19
                    </td>
                    <td className="px-6 py-4 text-center">
                        Kg
                    </td>
                    <td className="px-6 py-4 text-center">
                        900
                    </td>
                    <td className="px-6 py-4 text-center">
                        50
                    </td>
                    <td className="px-6 py-4 text-center">
                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
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
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                </svg>         
                Prev     
            </button>     
            <button className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white ml-2">         
                Next         
                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">         
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>     
            </button>   
        </div> 
    </div>  
    
    </div>
  )
};


export default InventoryTable;
