import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import react,{useState,useEffect, useRef} from 'react';

export default function InvoiceSystem() {
    const [item, setItem] = useState("");
    const [items, setItems] = useState([]);
    const [services, setServices] = useState([]);
    const [service, setService] = useState("");
    const isMounted = useRef(false);
    const addItem = () => {
        if (item !=  ""){
            setItems([...items, item]);
            setItem("")
        }

      };
    const addService = ()=>{
        if(service != ""){
            setServices([...services, service]);
            setService("");
        }
    }

    const removeItem = () => {
        setItems(items.slice(0, -1)); 
      };
    const removeServices =()=>{
        setServices(services.slice(0,-1));
    }
    const resetItem = ()=>{
        
    }
    useEffect(() => {
        if (isMounted.current) {
          console.log("Updated items:", items);
          console.log("Updated Services : ", services);
        } else {
          isMounted.current = true;
        }
      }, [items,services]); 
    const handlePrint = () => {
        const printWindow = window.open("", "_blank");
        if (printWindow) {
          printWindow.document.write(`
            <html>
              <head>
                <title>Print Page</title>
                <style>
                  body { font-family: Arial, sans-serif; padding: 20px; }
                </style>
              </head>   
              <body>
                <h1>Printable Content</h1>
                ${items.map(value => `<p>${Object.values(value).join('')}</p>`).join('')}
                ${services.map(value => `<p>${Object.values(value).join('')}</p>`).join('')}
                <script>
                  window.onload = function() {
                    window.print();
                    window.onafterprint = function() { window.close(); };
                  };
                </script>
              </body>
            </html>
          `);
          printWindow.document.close();
        }
      };
    
  return (
    <div className=" w-full  ">
    <div className="p-5 min-h-[400px]">
        <div className="flex gap-2 mb-5">
            <h1>PRODUCT</h1>
            <Input className="w-[500px]" value={item} onChange={(e)=>{setItem(e.target.value)}}></Input>
            <Button onClick={addItem}>Add cart</Button>
            <Button onClick={removeItem}>Remove Last Item</Button>
        </div>

        <div className="relative overflow-y-scroll max-h-[300px] ">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className=" sticky top-0  text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Product name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Quantity
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Total
                        </th>
                        
                    </tr>
                </thead>
                <tbody>
                    {items.map((value)=>(
                    <tr >
                        <td  className="px-6 py-4">
                            {value}
                        </td>
                        <td  className="px-6 py-4">
                            500
                        </td>
                        <td className="px-6 py-4">
                            2
                        </td>
                        <td className="px-6 py-4">
                            1000
                        </td>
                    </tr>

                    ))}
                </tbody>
            </table>
       
        </div>
       
    </div>
    <div className="flex justify-end gap-2 mt-5">
            <Button className="w-[200px] bg-green-600" onClick={handlePrint}>PURCHASE</Button>
            <Button className="w-[200px] bg-red-600">RESET</Button>
    </div> 



    <div className="p-5 min-h-[400px]">
        <div className="flex gap-2 mb-5">
            <h1>Services</h1>
            <Input className="w-[500px]" value={service} onChange={(e)=>{setService(e.target.value)}}></Input>
            <Button onClick={addService}>Add cart</Button>
            <Button onClick={removeServices}>Remove Last Item</Button>
        </div>

        <div className="relative overflow-y-scroll max-h-[300px] ">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className=" sticky top-0  text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Product name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Quantity
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Total
                        </th>
                        
                    </tr>
                </thead>
                <tbody>
                    {services.map((value)=>(
                    <tr >
                        <td  className="px-6 py-4">
                            {value}
                        </td>
                        <td  className="px-6 py-4">
                            500
                        </td>
                        <td className="px-6 py-4">
                            2
                        </td>
                        <td className="px-6 py-4">
                            1000
                        </td>
                    </tr>

                    ))}
                </tbody>
            </table>
       
        </div>
       
    </div>
    <div className="flex justify-end gap-2 mt-5">
            <Button className="w-[200px] bg-green-600" onClick={handlePrint}>PURCHASE</Button>
            <Button className="w-[200px] bg-red-600">RESET</Button>
    </div>

 


    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    
        <div>
    
    </div>
    


<h1 className="text-3xl font-bold mb-2 ">Transaction History</h1>
<div className="relative overflow-y-scroll max-h-[500px]" >
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <thead className=" sticky top-0  text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    DESCRIPTIONS
                </th>
                <th scope="col" className="px-6 py-3">
                    TOTAL
                </th>
                    
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17"
                </th>
                <td className="px-6 py-4">
                    Silver
                </td>

            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td className="px-6 py-4">
                    White
                </td>

            </tr>
            <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Magic Mouse 2
                </th>
                <td className="px-6 py-4">
                    Black
                </td>

            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td className="px-6 py-4">
                    White
                </td>

            </tr>
            <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Magic Mouse 2
                </th>
                <td className="px-6 py-4">
                    Black
                </td>

            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td className="px-6 py-4">
                    White
                </td>

            </tr>
            <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Magic Mouse 2
                </th>
                <td className="px-6 py-4">
                    Black
                </td>

            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td className="px-6 py-4">
                    White
                </td>

            </tr>
            <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Magic Mouse 2
                </th>
                <td className="px-6 py-4">
                    Black
                </td>

            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td className="px-6 py-4">
                    White
                </td>

            </tr>
            <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Magic Mouse 2
                </th>
                <td className="px-6 py-4">
                    Black
                </td>

            </tr>
        </tbody>
    </table>
    </div>

    </div>

    </div>
  );
}
