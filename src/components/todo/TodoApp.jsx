import "./todo.css";
import TodoData from "./TodoData";
import TodoNew from "./TodoNew";
import reactLogo from "../../assets/react.svg";
import { useState } from 'react';

const TodoApp = () => {
  const [todoList, setTodoList] = useState([
      
    ]);

    //{key:value}
    // const vars = "Ahn";
    // const age = 25;
    // const data = {
    //   address: "kontum",
    //   country: "Vietnam"
    // } // bien object

    const addNewTodo = (name) =>{
      const newTodo ={
        id: randomIntFromInternal(1, 1000000000),
        name: name
      }
        setTodoList([...todoList, newTodo]); //spread operator
          //setTodoList là hàm cập nhật giá trị cho biến todoList
          //...todoList là giá trị cũ
          //newTodo là giá trị mới
    } // đây là arrow function

  const randomIntFromInternal = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const deleteTodo = (id) => {
    const newTodo = todoList.filter(item => item.id !== id)
    setTodoList(newTodo); //cập nhật lại todoList sau khi xóa
  }

  return (
    <>
        <div className="todo-container">
            <div className="todo-title">Todo List</div>
            <TodoNew
            addNewTodo={addNewTodo} // addNewTodo không có dấu () để báo với Javascript rằng đâychỉ là tham chiếu thôi
            // addNewTodo() có dấu () để báo với Javascript rằng hãy chạy (thực thi) nó ngay đi
            />
            <TodoData 
            //{key:value}
            // name={vars}
            // age={age}
            // data = {data}
            todoList={todoList}
            //đặt tên như thế nào thì giá trị như vậy
            deleteTodo={deleteTodo} // truyền hàm deleteTodo vào để con có thể gọi hàm này
            />
            <div className="todo-image">
            <img src={reactLogo}></img>
            </div>
      </div>
    </>

  )
}

export default TodoApp;