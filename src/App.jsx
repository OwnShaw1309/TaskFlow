import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaRegEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";




function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])  // Stores all todo items as an array of objects
  // Example:
  // [
  //   { todo: "Study React", isCompleted: false },
  //   { todo: "Go to Gym", isCompleted: true }
  // ]

  const [finishedtodo, setfinishedtodo] = useState(true)



  useEffect(() => {
    let TodoString = localStorage.getItem("todos")
    if (TodoString) {

      let todos = JSON.parse(localStorage.getItem("todos"))  //Reads the stored string for "todos" and converts it back into a JS value (array/object)."parse" means convert a string into structured data. In JavaScript you use JSON.parse() to turn a JSON-formatted string into the equivalent JS value (object, array, number, string, boolean, or null).
      settodos(todos)
    }

  }, [])






  // .setItem(key, value): localStorage method that stores a string value under key; it overwrites existing keys and is synchronous.
  // JSON.stringify(todos): converts the todos JavaScript value (usually an array/object) into a JSON string so it can be stored (storage only holds strings).
  // todos: the variable (likely React state) holding your list of todos; its current value is serialized and stored


  // so acccording to my understanding set item stores the value converted to json string which is done by stringify

  const save_to_localstorage = () => {

    localStorage.setItem("todos", JSON.stringify(todos))
  }





  const handleEdit = (e) => {             //   t is the array of matching todos 
    // t[0] means “take the first item in that array”
    let id = e                             // .todo means “get the text of that todo”
    let t = todos.filter((item) => {     // settodo(...) stores that text into your todo state
      return item.id === id

    }
    )
    settodo(t[0].todo)
    save_to_localstorage()

    let newtodos = todos.filter((item) => {
      return item.id != id //it means when delete is clicked this function will be triggered then it will find the id and find its index then we create a neew duplicate todo where we rturn only those items whose id does not match the item of the clicked one
    }
    )
    settodos(newtodos) //at last we make the duplicate todo the new todo by bringing change in the original todo

  }












  const handleDelete = (e) => {
    let id = e
    // let index = todos.findIndex(item => {  //findindex returns first value which meets the criteria here it will return id
    //   return item.id === id;
    // })
    let newtodos = todos.filter((item) => {
      return item.id != id //it means when delete is clicked this function will be triggered then it will find the id and find its index then we create a neew duplicate todo where we rturn only those items whose id does not match the item of the clicked one
    }
    )
    settodos(newtodos) //at last we make the duplicate todo the new todo by bringing change in the original todo
    save_to_localstorage()
  }





  const handleSave = (e) => {    //on clicking the save button, this function is called. It adds the current todo to the todos (... operator is used to copy the existing todos array and add a new object with the current todo and isCompleted set to false) 


    if (todo.length != 0) {
      settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
      // at this point i am just incleasing the no. of elements in list


      //here todo is the current value of the todo state for example: if you type "Study React" in the input field and click save, the todos array will be updated to include a new object { todo: "Study React", isCompleted: false }.
      // Example:
      // {//   study react, (input by user)
      //   isCompleted: false
      // }
      // {
      //reaction
      //   todo: "Study React",
      //   isCompleted: false
      // }


      //by using id now id is attached in every todo just like is completed

      settodo("")  //the input field is cleared after saving the todo because value ={todo} and here at lasr we ARE SETTING todo =""
      save_to_localstorage()
    }
  }







  const handleChange = (e) => {

    settodo(e.target.value)           // When you type Hello:

    // You press H.
    // onChange fires.

  }                                   // handleChange runs.
  // e.target.value is "H".
  // settodo("H") updates the state.
  // React re-renders.
  // The input's value={todo} becomes "H".

  // The same process repeats for every keystroke.




  const handleCheckbox = (e) => { //i am trying to to get strike through on th
    let id = e.target.name
    let index = todos.findIndex(item => {  //findindex returns first value which meets the criteria here it will return id
      return item.id === id;
    })



    let newTodos = [...todos];  //newTodos = [...todos] creates a new array copy.
    // newTodos = [todos] would create a different structure: one element that is the whole original todos array That means newTodos[index] would not be the todo item you expect unless index is 0.

    // Also, this matters because React prefers state updates to be done immutably, so you avoid accidentally mutating the old state directly
    // so the short reason is: [...] makes a real copy of the array, while [todos] wraps the whole array inside a new one.

    newTodos[index].isCompleted = !newTodos[index].isCompleted
    settodos(newTodos)
    save_to_localstorage()
  }


  const togglefinish = (e) => {
    setfinishedtodo(!finishedtodo)

  }





  return (
    <>
      <Navbar />




      <div className="md:container md:mx-auto bg-blue-200 mx-auto my-5 p-5 rounded-xl md:w-1/2  w-full min-h-screen flex-wrap relative">
        <div className="mx-auto font-bold text-3xl flex justify-center items-center   flex-wrap"><h1>TaskFlow — "Flow through your day."</h1></div>
        <div className="font my-2 top-2 relative"><h2>Add a Todo</h2></div>


        <div className="input flex  gap-3.5 w-full items-center  ">
          
          <div className="text w-full ">< input className=' flex-1 bg-white w-full   px-3 py-1 rounded-2xl' onChange={handleChange} type="text" value={todo} />

          </div> {/* important WHEN WRITING ON CHANGE IS TRIGGERED FIRST THE IT DISPLAYS THE VALUE STORED IN TODO WHICH IS VALUE={todo}*/}




          <button onClick={handleSave} className='bg-blue-950 my-3 text-amber-50 rounded-[10px] p-0.5 w-18 shrink-0'>Save</button>
        </div>





        <input className='my-4 gap-2.5 mx-4' type="checkbox" checked={finishedtodo} onChange={togglefinish} />Show Finished

        <div className="bg-black w-full h-0.5 opacity-30"></div>


        {todos.length === 0 && <div className="flex my-[30vh] justify-center items-center ">No todos Yet!</div>}
        {/* in JavaScript, && means “if the left side is true, then show the right side”
      example:
      true && "hello"   // "hello"
      false && "hello"  // false */}






        {todos.map((item) => {

          return (finishedtodo || !item.isCompleted) &&

          //finish todo is initially false then we cllick checkbox it becomes false and is completed becomes true but here it becomes false hence divs are not rendered
            // The condition checks:
            // If finishedtodo is false and a todo is unfinished, then:

            // false || true → true
            // so that todo is shown i.e that todos divs will be rendered
            // If finishedtodo is false and a todo is already finished, then:

            // false || false → false
            // so that todo is hidden i.e that todos divs will not render
            // So:

            // unchecked box = show only unfinished todos
            // checked box = show all todos

            // The && works like a gate:

            // if the left side is true, React shows the right side
            // if the left side is false, React hides it 
            (


              <div key={item.id} className=" items-center justify-center relative w-full subcontainer flex  gap-4 my-8  shrink-0">
                <input name={item.id} type="checkbox" checked={item.isCompleted} className="shrink-0" onChange={handleCheckbox} />
                {/* checkbox is checked if item.isCompleted is true */}

                {/* flex-1 helps the text area take available space
min-w-0 prevents flex items from overflowing
shrink-0 keeps the checkbox and buttons fixed */}





                <div className={`${item.isCompleted ? 'line-through' : ''}  flex-1 break-all`}>
                  {item.todo}
                </div>
                {/* condition ? valueIfTrue : valueIfFalse */}



                <div className="buttons flex max-w-full gap-2 shrink-0">
                  <button onClick={() => { handleEdit(item.id) }} className='text-amber-50 bg-blue-950 rounded-[10px] p-0.5 px-2 w-12 h-10 flex items-center justify-center '><FaRegEdit /></button>
                  {/* so here it is saying on click trigger the arrow function which will trigger handle edit taking the argument id with him */}







                  <button onClick={() => { handleDelete(item.id) }} className=' text-amber-50  bg-blue-950 rounded-[10px] p-0.5 px-2 w-12 h-10  flex items-center justify-center'><AiFillDelete /></button>
                  {/* e is the click event information
                  You usually use it when you want to know things like:

                  which element was clicked
                  what key was pressed
                  where the click happened */}

                </div>
              </div>

            )
        })}
      </div>

    </>
  )
}

export default App
