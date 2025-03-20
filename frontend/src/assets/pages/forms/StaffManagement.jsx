import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteForever } from "react-icons/md";
import { AiOutlineFolderView } from "react-icons/ai";
import { SiVirustotal } from "react-icons/si";
export default function Attendance() {
  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
    <div className="grid grid-cols-6 gap-4">
    <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 col-span flex justify-evenly">
       <div>Total Staff</div>
        <div>9</div>
    </div>
    <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 col-span flex justify-evenly">
    <div>Active Staff</div>
    <div>9</div>
    </div>
    <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 col-span flex justify-evenly">
    <div>On Leave</div>
    <div>9</div>
    </div>
    <div class="relative shadow-md sm:rounded-lg  col-span-6">
        <div className="flex justify-between mb-3">
            <h1 className="text-3xl font-bold">Profiles</h1>
            <div>
                <Button>Add Profile</Button>
            </div>
        </div>
        <div className="overflow-y-scroll max-h-[300px]">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                        ID
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Name
                    </th>
                    <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                        Role
                    </th>
                    <th scope="col" class="px-6 py-3">
                    Status
                    </th>
                    <th scope="col" class="px-6 py-3">
                    Shift Time
                    </th>
                    <th scope="col" class="px-6 py-3">
                    Contact
                    </th>
                    <th scope="col" class="px-6 py-3">
                    Action
                    </th>
                </tr>
            </thead>
            <tbody>
            
                
                <tr class="border-b border-gray-200 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    1
                    </th>
                    <td class="px-6 py-4">
                        Hans Jerby B De Lana
                    </td>
                    <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                        Veterinarian
                    </td>
                    <td class="px-6 py-4">
                        Active
                    </td>
                    <td class="px-6 py-4">
                        09:00-17:00
                    </td>
                    <td class="px-6 py-4">
                        1234-567-8910
                    </td>
                    <td class="px-6 py-4 flex">
                    <CiEdit className="text-3xl"/>
                    <MdOutlineDeleteForever className="text-3xl"/>
                    <AiOutlineFolderView  className="text-3xl"/>
                    </td>
                </tr>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    1
                    </th>
                    <td class="px-6 py-4">
                        Hans Jerby B De Lana
                    </td>
                    <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                        Veterinarian
                    </td>
                    <td class="px-6 py-4">
                        Active
                    </td>
                    <td class="px-6 py-4">
                        09:00-17:00
                    </td>
                    <td class="px-6 py-4">
                        1234-567-8910
                    </td>
                    <td class="px-6 py-4 flex">
                    <CiEdit className="text-3xl"/>
                    <MdOutlineDeleteForever className="text-3xl"/>
                    <AiOutlineFolderView  className="text-3xl"/>
                    </td>
                </tr>
            
                
                
                </tbody>
            </table>
        </div>
    </div>


    </div>
  </div>


  );
}