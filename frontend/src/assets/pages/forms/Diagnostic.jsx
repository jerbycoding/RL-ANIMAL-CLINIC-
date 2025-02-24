import React from 'react'

function Diagnostic() {
  return (
    <div>
      <label>Blood Exam  <input type='text'></input></label>
      <label>Distemper Test  <input type='text'></input></label>
      <label>Ear Swabbing  <input type='text'></input></label>
      <label>Ehrlichia Test  <input type='text'></input></label>
      <label>Heartworm Test  <input type='text'></input></label>
      <label>Parvo Test  <input type='text'></input></label>
      <label>Skin Scrapping  <input type='text'></input></label>
      <label>Ultra Sound  <input type='text'></input></label>
      <label>Urine Exam  <input type='text'></input></label>
      <label>Vaginal Smear  <input type='text'></input></label>
      <label>X Rays  <input type='text'></input></label>
      <label>Other Test  <input type='text'></input></label> {/*something na i add durias*/}

      <textarea placeholder='Comment about diagnostic'></textarea>
    </div>
  )
}

export default Diagnostic
