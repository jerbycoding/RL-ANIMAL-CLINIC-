import React from "react";
import { Button } from "@/components/ui/button";
import { IoClose } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
export default function EditItemModal({ onClose }) {


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] relative">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">ITEM</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <IoClose className="text-2xl" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="mb-4">
          <Label>
            Name
            <Input></Input>
          </Label>
          <Label>
            Batch 
            Number
            <Input></Input>
          </Label>
          <Label>
            Unit
            <Input></Input>
          </Label>
          <Label>
            Price
            <Input type="number"></Input>
          </Label>
          <Label>
            Stock
            <Input type="number"></Input>
          </Label>
          <Label>
            <p>Type</p>
                 <select id="cars" name="cars" className="p-1 w-[200px] text-center">
                     <option value="food">Food</option>
                     <option value="medicine">Medicine</option>
                 </select>
          </Label>            
     
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end gap-2">
          <Button onClick={onClose} className="bg-gray-300 text-black">Close</Button>
          <Button className="bg-blue-500 text-white">Confirm</Button>
        </div>
      </div>
    </div>
  );
}