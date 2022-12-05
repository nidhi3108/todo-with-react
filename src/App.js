//react ko y btane k liy ki change hue h to uske liy hook ka use krte h y ui k change ko batae hai
import React ,{useEffect, useState} from 'react';
import Input from "./component/input";
let ip=" ";
let ipValue;
let del;


export default function App()
{
   
//todos k andar ek array hai
const [todos, setTodos] = useState([]);
  //input box khali krnw k liy
const [ip, setIP] = useState('')
  //for delete todo
const [del] = useState([]);


//for storing the data on server
useEffect( () => {
   fetch("http://localhost:8000")
   .then(function(response){
    // console.log(response);
    return response.json();
   })
   .then(function(data){
    // console.log(data);
    setTodos(data)
   });
  //  .catch((err)=>{
  //   console.log(err);
  //  });
}, []);

  
function onInputChange(event)
  {
      const value=event.target.value;
          setIP(value);
          ipValue=value;     

          // ipValue=value;
          // console.log(ipValue);
          // var data=App(); //jo call krta h usi ko data milta h to usko phle store krana pdega tb access krenge
          // console.log(data);
  }
  console.log(ipValue);

 async function saveTodo(){

    //todos array me hm value bhejenge
          // todos.push(ip);
          // setTodos(todos);
          //agar same data bar bar jayega to react rerenderng rok deta hai iske liy hm new array bna k usme data bhejte hai
          //nyi array m data store hota jayega
         
          //[[[[----- 
            // let newTodos=todos.map(function(todo){
          //   return todo;
          // })

          // newTodos.push(ip)  //will insert the todo value one by one(increse no of todo)
          // setTodos(newTodos)  //ye yah btaata ki kuch change hua h aur set state jo change hua h vo todo vali initial array ko data bhej degi vha store  ho jyega nya data

            //----]]]  we can use spread opertaor in place if it
    //save todo on the server by  fetch method


     await saveTodoServer(ipValue)
            setTodos([...todos,ipValue]);
          setIP(" ");

}  
console.log(todos);
function saveTodoServer(){
     return fetch("http://localhost:8000/save",{
      method:"POST",
      body:JSON.stringify({todo:ipValue}),
      headers:{
        "Content-Type":"application/json",
      },
     });
}

  function deleteTodo(){
    let delTodos=todos.map(function(todo){
        return todo;
      })
      delTodos.pop(ipValue)  
      setTodos(delTodos) 
    // var index=todos.indexOf(ipValue);     
    //       console.log(index);
    // console.log(ipValue);
    //    setDel([...del.splice(index, 1)]);
    //    console.log(setDel);
      //  setIP(" ");
}


  return(
 <>
 
 {/* <input value={ip} onChange={onInputChange} placeholder='type something'/> */}
 {/* <Input abc="type" onChange={onInputChange} value={ip}/> */}
 <Input abc="write" onChange={onInputChange} value={ip}/>
 <button onClick={saveTodo}>save</button>
 <button onClick={deleteTodo}>Delete</button>
 
 <ul>
   { 
       //agr change ki hui value store krni h to nya array bnao nhi to aise hi logic lkh do
       //mgr react m {} iske andar bina new array map lga k new array vala kam ho jata h
        todos.map(function(todo,index){
          return <li key={index}>{todo}</li>
        })
    }
    {
      del.map(function(todo,index){
        return <li key={index}>{todo}</li>
      })
    }
 </ul>
 </>
  )
}

