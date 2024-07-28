"use client"

import { NinjaType } from "../types/pbdb";

const Ninja = ( { ninjaData }: {ninjaData: NinjaType}) => {
  return (
    <div className="outerNinja">

      <div className={`innerLeft ${ninjaData.belt}`}>
        <img className='image' src={`icons/IconSquare${ninjaData.imgNum}.png`}/>
        <p className='ninjaName'>{ninjaData.name}</p>
      </div>

      <div className='ninjaData'>

        <p>Ninja Bucks: {ninjaData.bucks}</p> <br/>

        Last Level Up: {ninjaData.llu}<br/>

        {ninjaData.ice && <p className='emoji'>🍦</p>}
        {!ninjaData.ice && <p className='emoji'>❌</p>}

        <div>
          <button className='ninja-button' >Level Up</button>
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