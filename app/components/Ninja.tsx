"use client"

import { NinjaType } from "../types/pbdb";

const Ninja = ( { ninjaData }: {ninjaData: NinjaType}) => {
  return (
    ninjaData.name
  );
}
 
export default Ninja;