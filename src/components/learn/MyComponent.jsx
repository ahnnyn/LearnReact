const MyComponent = () => {
  const name = "Ahn";
  const mang = [1,2,3,4,5]; //mảng 
  const doituong ={
    ten: "Ánh",
    tuoi: 23
  } //object
  return (
    <div>
      <h2>{name}</h2>
      <p>{mang}</p>
      <p>{doituong.ten}, {doituong.tuoi}</p>
      <div>{JSON.stringify(doituong)}</div>//Dùng JSON.stringify để biến 1 object thành string
      <h1>Hello, World!</h1>
      <p>This is a simple component.</p>
    </div>

    //sử dùng style in line: dùng hai dấu {{}}: dấu {} thứ nhất để tượng trưng cho việc code Javascript bên trong HTML; dấu {} thứ hai để tượng trưng cho object
  );
};

export default MyComponent;
