"use client"

import { NinjaListType } from "../types/pbdb";
import Ninja from "./Ninja";

const NinjaList = ( { ninjaList }: { ninjaList: NinjaListType } ) => {
  return (
    ninjaList.map(ninjaData => {
      return <Ninja ninjaData={ninjaData}/>
    })
  );
}
 
export default NinjaList;

