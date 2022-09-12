import React from "react"
import Die from "./components/Die";
import {nanoid} from "nanoid"
import Confetti from "react-confetti"


function App() {
 
 
  const [dice,setdice] = React.useState(Allnewdice())
  const [tenzies, setTenzies] = React.useState(false)
  const [rolls,setrolls] = React.useState(0)
  const [Time, Settime] = React.useState(0)

   


  // here we have create the generatenewdice function which always get called
  // up when the new dice to be generated
  function generatenewdice() {  
    return {
      value:Math.ceil(Math.random()*6),
        isheld : false,
        id:nanoid(),
        rolls : 0,
        Time : 0
    }
  }
  

 

  // here we have create the allnewdice function to randomly take any number   
  // in between six and push it to new array
  function Allnewdice(){
    const newdice = []
    for (let i= 0 ; i < 20 ; i++ ) {
      newdice.push(generatenewdice())
    } 
    return newdice
  }
  


  // here we have create the holddice function to check the id of the number
  // which is on hold
  function holddice(id) {
    setdice(oldDice => oldDice.map(nums => {
      return id === nums.id ?
        {...nums,isheld : ! nums.isheld  } :
        nums
    }))
  }



  // here we have create the rolldice function if number is hold then it can change 
  // other number 
  function rolldice() {
    if (tenzies===false){
    setrolls (rolls + 1)
    setdice(oldDice => oldDice.map(nums => {
      return nums.isheld ? 
            nums  :
            generatenewdice()
        
    }))
  }
    else {
      setTenzies(false)
      setdice(Allnewdice())
      setrolls(0)
      Settime(0)
     
    }
  }
  

  React.useEffect(() => {
    let timer = 0  
    const times = setInterval( () => {
        Settime(timer++)
        },1000)
      
    if (tenzies===true){
      timer = 0 
      Settime(timer)
      clearInterval(times)
    }
  },[])

  

  // Here we have side effect due to connect two instance or state 
  React.useEffect(() => {     
     const allHeld = dice.every(die => die.isheld)
     const firstValue = dice[0].value
     const allSameValue = dice.every(die => die.value === firstValue)
     if (allHeld && allSameValue) {
         setTenzies(true)
         alert("You won!")
    }
 
    }, [dice])

 

  // here we have map the alldice to get the the number
  // and set the Die component arguments. 
  const alldice = dice.map((nums) =>{
    return (<Die 
            value={nums.value}
            key={nums.id}
            isheld={nums.isheld} 
            holdDice={() => holddice(nums.id)}
            />)
  } )
 

  // here we have use the jsx format to get the required html.
  return(
      <main className="main-wall">
        {tenzies && <Confetti /> }
          
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze
            it at its current value between rolls.</p>
        <div className="points">
        <h2 className="time">Time = {Time} Seconds </h2>
          <h2 className="rolls">Rolls =  {rolls} </h2>
        </div>
        <div  className="Die-container">
          {alldice}
        </div>
          <button 
            className="btn-roll"  
            onClick={rolldice}
            >{tenzies  ? "New Game" : "Roll"}</button>
      </main>


)}

export default App;
