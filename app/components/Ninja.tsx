"use client"

import { useState } from "react";
import { updateNinjas, deleteNinja } from "../actions/dbActions";
import { NinjaType } from "../types/pbdb";
import { getCurrentDate, nextBelt, prevBelt } from "../utils/utils";

const Ninja = ( { ninjaData }: {ninjaData: NinjaType}) => {

  const [editing, setEditing] = useState(false)
  const [editValue, setEditValue] = useState(0)

  const onLevelUp = () => {
    const data = {
      "bucks": ninjaData.bucks + 5,
      "llu": getCurrentDate()
    }
    updateNinjas(ninjaData.id, data)
  }

  const onBeltUp = () => {
    const data = {
      "bucks": ninjaData.bucks + 15,
      "llu": getCurrentDate(),
      "belt": nextBelt(ninjaData.belt)
    }
    updateNinjas(ninjaData.id, data)
  }

  const onBeltDown = () => {
    const data = {
      "belt": prevBelt(ninjaData.belt)
    }
    updateNinjas(ninjaData.id, data)
  }

  const onIceCream = () => {
    if (!ninjaData.ice) return alert(`${ninjaData.name} already got ice cream this month!`)
    if (ninjaData.bucks < 10) return alert(`${ninjaData.name} doesn't have enough ninja bucks for ice cream!`) //TODO ADD SWAL
    const data = {
      "bucks": ninjaData.bucks-10,
      "ice": false
    }
    alert(`${ninjaData.name} has bought ice cream!`)
    updateNinjas(ninjaData.id, data)
  }

  const editNinja = () => {
    if (editing) {
      setEditing(false)
      const data = {
        "bucks": editValue
      }
      updateNinjas(ninjaData.id, data)
    } else {
      setEditing(true)
      setEditValue(ninjaData.bucks)
    }
  }

  const onDeleteNinja = () => {
    deleteNinja(ninjaData.id)
  }

  return (
    <div className="outerNinja">

      <div className={`innerLeft ${ninjaData.belt}`}>
        <img className='image' src={`IconSquare${ninjaData.imgNum}.png`}/>
        <p className='ninjaName'>{ninjaData.name}</p>
      </div>

      <div className='ninjaData'>

        <p>Ninja Bucks: 
          {!editing && ninjaData.bucks}
           {editing && <input type='number' value={editValue} onChange={e => setEditValue(Number(e.target.value))}/>}
        </p> 
        <br/>

        Last Level Up: {ninjaData.llu}<br/>

        {ninjaData.ice && <p className='emoji'>🍦</p>}
        {!ninjaData.ice && <p className='emoji'>❌</p>}

        <div>
          <button className='ninja-button' onClick={onLevelUp}>Level Up</button>
          <button className='ninja-button' onClick={onBeltUp}>Belt Up</button>
          <button className='ninja-button' onClick={onBeltDown}>Belt Down</button>
          <button className='ninja-button' onClick={onIceCream}>Ice Cream</button>
        </div>

      </div>

      <div>
        <button className="editButton" onClick={editNinja}>✏️</button>
        {editing && <button className="editButton" onClick={onDeleteNinja}>❌</button>}
      </div>

    </div>
  );
}
 
export default Ninja;