"use client"

import { NinjaListType } from "../types/pbdb";
import Ninja from "./Ninja";

const NinjaList = ( { ninjaList }: { ninjaList: NinjaListType } ) => {
  return (<>
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 shadow my-4 bg-white">
      Search: <input type="text"/>
    </div>

    {ninjaList.map(ninjaData => {
      return <Ninja key={ninjaData.id} ninjaData={ninjaData}/>
    })}
  </>);
}
 
export default NinjaList;

