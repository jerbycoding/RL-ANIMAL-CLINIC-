import React from 'react'

function Form() {
  return (
    <div>
        <label>
               Owner's Name* <input type="text" className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </label>
        <label>
               Contact Number* <input type="text" className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </label>
        <label>
               Addrress <input type="text" className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </label>    
        <label>
               Tel <input type="text" className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </label>
       
        <input type="radio" id="html" name="fav_language" value="HTML"/>
        <label for="html">OLD</label>
        <input type="radio" id="css" name="fav_language" value="CSS"/>
        <label for="css">NEW</label>
       
        <br></br>
        <h1>IF OLD OWNER</h1>
        <label>
               SEARCH Owner's Name* <input type="text" className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </label>
        <h1>Patien Information</h1>
        <label>
              Patient's Namez* <input type="text"  className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              
        </label>
        <label>
              Breed* <input type="text"   className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              
        </label>
        <label>
              Sex* <input type="text"  className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              
        </label>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
        SAVE
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
        CANCEL
        </button>
     
        
    </div>
  )
}

export default Form
