import React, { useState } from 'react';
import './styles/Cards.css'
import *as api from '../api/index'
import TestGet from '../pages/TestGet'
import TestDelete from '../pages/TestDelete'
import TestPost from '../pages/TestPost'
import login from '../pages/login'


const Cards = (props) => {

    const [data, setData] = useState([])
    const getAllData = () => {
        api.getAllTests().then(response => {
            setData(response.data.data)
        })
    }


    const deleteDataById = (id) => {
        api.deleteTestById(id)
    }

    const postDataArr = (arr) =>{
        api.insertTest(arr)
    }


    return (
        <React.Fragment>
            <div className="cards">
                <div className="get">
                    <TestGet getData={getAllData} gdata={data} />
                </div>
                <div className="post">
                    <TestPost postData={postDataArr} />
                </div>
                <div className="delete">
                    <TestDelete deleteData={deleteDataById} />
                </div>
            </div>
            <div className="logoutbuttondiv">
                <button>Logout</button>
            </div>
        </React.Fragment>
    )

}

export default Cards