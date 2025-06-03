import { Drawer } from "antd";

const ViewUserDetail = (props) =>{
    const {
        isDetailOpen, 
        setIsDetailOpen, 
        dataDetail, 
        setDataDetail, 
    } = props;  

    const resetAndCloseModal = () => {
        setIsDetailOpen(false);
        setDataDetail(null);
    }
    return (
        <Drawer
                title="Basic Drawer"
                closable={{ 'aria-label': 'Close Button' }}
                onClose={resetAndCloseModal}
                open={isDetailOpen}
            >
                {dataDetail ? <>
                    <p>ID: {dataDetail._id}</p>
                    <p>Full name: {dataDetail.fullName}</p>
                    <p>Email: {dataDetail.email}</p>
                    <p>Phone number: {dataDetail.phone}</p>
                </>
                : <span>Loading...</span>}
            </Drawer>
    )
}

export default ViewUserDetail;