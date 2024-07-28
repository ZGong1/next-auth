"use client"

import { updateNinjas } from "../actions/dbActions";
import { NinjaType } from "../types/pbdb";
import { getCurrentDate } from "../utils/utils";

const Ninja = ( { ninjaData }: {ninjaData: NinjaType}) => {

  const onLevelUp = () => {
    const data = {
      "bucks": ninjaData.bucks + 5,
      "llu": getCurrentDate()
    }
    updateNinjas(ninjaData.id, data)
  }

  return (
    <div className="outerNinja">

      <div className={`innerLeft ${ninjaData.belt}`}>
        <img className='image' src={`IconSquare${ninjaData.imgNum}.png`}/>
        <p className='ninjaName'>{ninjaData.name}</p>
      </div>

      <div className='ninjaData'>

        <p>Ninja Bucks: {ninjaData.bucks}</p> <br/>

        Last Level Up: {ninjaData.llu}<br/>

        {ninjaData.ice && <p className='emoji'>🍦</p>}
        {!ninjaData.ice && <p className='emoji'>❌</p>}

        <div>
          <button className='ninja-button' onClick={onLevelUp}>Level Up</button>
          <button className='ninja-button' >Belt Up</button>
          <button className='ninja-button' >Belt Down</button>
          <button className='ninja-button' >Ice Cream</button>
        </div>

      </div>

      <div>
        <button className="editButton">✏️</button>
        <button className="editButton">❌</button>
      </div>

    </div>
  );
}
 
export default Ninja;