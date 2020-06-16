import React, { useState } from "react";
import "./styles/Cards.css";
import * as api from "../api/index";
import TestGet from "../pages/TestGet";
import TestDelete from "../pages/TestDelete";
import TestPost from "../pages/TestPost";
import { useEffect } from "react";

const Cards = (props) => {
  const [data, setData] = useState(null);



  useEffect(() => {
    if (!data || data.length === 0) {
      api.getAllTests().then((response) => {
        setData(response.data.data);
      });
    } else {

    }
  }, [])

  const formatData = () => {
    return data.map((n, i) => {
      let item = i + 1;
      return (
        <li>
          <p>Post: {item}</p>
          <div>{n._id}</div>
          <div>{n.name}</div>
          <div>{n.desc}</div>
          <div>{n.author}</div>
        </li>
      );
    });
  };

  const deleteDataById = (id) => {
    api.deleteTestById(id);
  };

  const postDataArr = (arr) => {
    api.insertTest(arr);
  };
  console.log(data)
  return (
    <React.Fragment>
      <div className="cards">
        <div className="get">
          <h2>Posts</h2>
          {data && data.length > 0 ? <ul>{formatData()}</ul> : <p>no data</p>}
        </div>
        <div className="post">
          <TestPost user={props.user} postData={postDataArr} />
        </div>
        <div className="delete">
          <TestDelete deleteData={deleteDataById} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Cards;
