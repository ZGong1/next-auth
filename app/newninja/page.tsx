"use client"

import { useState } from "react";
import { createNinja } from "../actions/dbActions";

const Home = () => {

  const [name, setName] = useState("")
  const [bucks, setBucks] = useState(0)

  const onSubmit = () => {
    createNinja(name, bucks)
  }

  return (
    <div>
      <h1>Enter New Ninja's Info</h1>
      Name: <br/><input value={name} onChange={e => setName(e.target.value)} /><br/>
      Ninja Bucks: <br/><input type="number" value={bucks} onChange={e => setBucks(Number(e.target.value))}/><br/><br/>
      <button onClick={onSubmit}>Add</button>
    </div>
  );
}
 
export default Home;