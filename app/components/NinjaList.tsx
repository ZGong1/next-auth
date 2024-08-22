"use client"

import { useState } from "react";
import { NinjaListType } from "../types/pbdb";
import Ninja from "./Ninja";

const NinjaList = ( { ninjaList }: { ninjaList: NinjaListType } ) => {

  const [searchString, setSearchString] = useState("")
  const toShow = ninjaList.filter(item => {
    return item.name.toUpperCase().includes(searchString.toUpperCase())
  })

  return (<>
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 shadow my-4 bg-white">
      Search: <input type="text" value={searchString} onChange={e => setSearchString(e.target.value)}/>
    </div>

    {toShow.map(ninjaData => {
      return <Ninja key={ninjaData.id} ninjaData={ninjaData}/>
    })}
  </>);
}
 
export default NinjaList;

