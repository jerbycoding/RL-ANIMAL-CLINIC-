import React from 'react'

function Medical() {
    //use props for the patient
  return (
    <div>
      <h1>
        Complaints/ Requres : 
          <textarea placeholder='Comment Section' className='border border-black'></textarea>
      </h1>
      <label>Medication Given by the owner : 
        <input type='text' placeholder='comment...' className='border border-black'></input>
      </label>
      <label>Medication Given by the vets : 
        <input type='text' placeholder='comment...'className='border border-black'></input>
      </label>
    
    </div>
  )
}

export default Medical
