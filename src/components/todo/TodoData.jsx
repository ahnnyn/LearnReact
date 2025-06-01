const TodoData = (props) =>{
//const TodoData =({name}) =>{
    //props là một biến object {} do đó có thể sử dựng object destructuring

    //const {name, age, data} = props; //destructuring : viết tắt vì khi ở component cha ta truyền ba giá trị vào thì ở component con ta sẽ nhận được một object chứa ba giá trị đó
    // const name = props.name;
    // const age = props.age;
    // const data = props.data;
    console.log(">>>check props: ", props);
    const { todoList, deleteTodo } = props; //lấy giá trị todoList từ props

    const handleOnClick = (id) => {
        deleteTodo(id); //gọi hàm deleteTodo từ props và truyền id của item cần xóa
    }


    return (
        <div className="todo-data">
            {todoList.map((item, index) => {
                return (
                    <div className="todo-item" key={item.id}>
                        <div>{item.name}</div>
                        <button
                            onClick={() => handleOnClick(item.id)} //truyền id của item để biết item nào sẽ bị xóa
                            style={{cursor: "pointer"}}>Delete</button>
                    </div>
                    )
            })}
            {/* <div >
                {JSON.stringify(props.todoList)}
            </div> */}
        </div>
    )
}

export default TodoData;

//props thay doi thi giao dien thay doi theo ma khong can reaload trang web (giao dien)
// App là component cha, TodoData là component con
// App truyền giá trị vào TodoData thông qua props
// Compnent nào bọc component thì component bọc ngoài là cha
// Trong jsx không thể in ra được array, không thể in ra được object 
// Trong jsx muốn code javascript thì sử dụng dấu {}
// Định nghĩa data tại cha rồi truyền dữ liệu sang con thông qua props