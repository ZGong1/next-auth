"use client"

import { updateNinjas } from "../actions/dbActions";
import { NinjaType } from "../types/pbdb";
import { getCurrentDate, nextBelt, prevBelt } from "../utils/utils";

const Ninja = ( { ninjaData }: {ninjaData: NinjaType}) => {

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
          <button className='ninja-button' onClick={onBeltUp}>Belt Up</button>
          <button className='ninja-button' onClick={onBeltDown}>Belt Down</button>
          <button className='ninja-button' onClick={onIceCream}>Ice Cream</button>
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