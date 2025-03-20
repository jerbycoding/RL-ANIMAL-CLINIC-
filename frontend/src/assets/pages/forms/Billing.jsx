import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function InvoiceSystem() {
 

  return (
    <div className=" w-full  h-[80vh]"> 
      

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Description
                </th>
                <th scope="col" class="px-6 py-3">
                    Quantity 
                </th>
                <th scope="col" class="px-6 py-3">
                   Amount
                </th>

            </tr>
        </thead>
        <tbody>
            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <Input></Input>
                </th>
                <td class="px-6 py-4">
                   <Input type="number"></Input>
                </td>
                <td class="px-6 py-4">
                    150
                </td>


            </tr>
            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <Input></Input>
                </th>
                <td class="px-6 py-4">
                   <Input type="number"></Input>
                </td>
                <td class="px-6 py-4">
                    150
                </td>


            </tr>
            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <Input></Input>
                </th>
                <td class="px-6 py-4">
                   <Input type="number"></Input>
                </td>
                <td class="px-6 py-4">
                    150
                </td>


            </tr>
            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <Input></Input>
                </th>
                <td class="px-6 py-4">
                   <Input type="number"></Input>
                </td>
                <td class="px-6 py-4">
                    150
                </td>


            </tr>
            
        </tbody>
    </table>
  
</div>
<div>
      <Button>Proceed</Button>
    </div>

    </div>
  );
}
