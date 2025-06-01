import { useState } from "react";

const TodoNew = (props) =>{

    //useState hook (getter, setter)
    //const valueInput = "Ahn";

    const [valueInput, setValueInput] = useState(""); // đây gọi là destructuring object

    //hàm setValueInput (có từ set ở đâu) dùng để cập nhật giá trị cho biến valueInput thông qua công cụ của React và useState
    const {addNewTodo} = props;
    //addNewTodo("Ahn");

    const handleClick = () =>{
        addNewTodo(valueInput);
        setValueInput(""); //sau khi thêm xong thì ô input sẽ trống
    } //khi nhấn nút

    const handleOnChange = (name) =>{
        setValueInput(name); //Biến name là giá trị của ô input truyền vào
        //Cập nhật valueInput mỗi khi người dùng nhập vào ô input.
    } //khi nhập vào ô input


    return (
        <div className="todo-new">
            <input type="text" placeholder="Enter your task"
                onChange={(event)=>handleOnChange(event.target.value)}
                value={valueInput} //valueInput là giá trị của ô input
            ></input>
            <button 
                style={{cursor: "pointer"}}
                onClick={handleClick} //có () chạy luôn function này, không có () thì có nghĩa là tham chiếu tới mỗi lần click thì hãy chạy function này
            >Add</button>
            {/* <div>My text input is = {valueInput}</div> */}
            
        </div>
    )
}
//để truyền sự kiện ta dùng: on + sự kiện. Ví dụ: onClick, onChange
export default TodoNew;