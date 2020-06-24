import React, { useState } from "react";
import "./styles/Cards.css";
import * as api from "../api/index";
import TestPost from "../pages/TestPost";
import { useEffect } from "react";

const Cards = (props) => {
  const [data, setData] = useState(null);
  const [editpost, seteditpost] = useState(false);

  useEffect(() => {
    if (!data || data.length === 0) {
      api.getAllTests().then((response) => {
        setData(response.data.data);
      });
    } else {
    }
  }, []);

  const editPostActivate = (n) => {
    seteditpost(true);
    setCurrUpdate(n);
  };

  const confirmEditPost = (id) => {
    console.log(id);
  };

  const handleChange = (event) => {
    //console.log(event.target.value);
    const data = currUpdate;
    console.log(data.name);
    data.name = event.target.value;
    setCurrUpdate(data);
  };

  const [currUpdate, setCurrUpdate] = useState({});
  //console.log(currUpdate);
  const formatData = () => {
    return data.map((n, i) => {
      let item = i + 1;
      return (
        <li>
          <p>Post: {item} </p>
          {editpost ? (
            <React.Fragment>
              <form className="updatefield">
                <input
                  onChange={handleChange}
                  value={currUpdate.name}
                  // placeholder="Title"
                  className="inputf"
                ></input>
                <textarea
                  onChange={handleChange}
                  value={currUpdate.desc}
                  className="inputf"
                  type="textarea"
                  // placeholder="Description"
                ></textarea>
              </form>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div>{n.name}</div>
              <div>{n.desc}</div>
            </React.Fragment>
          )}
          <div>Author: {n.author}</div>
          {editpost ? (
            <React.Fragment>
              <button onClick={() => confirmEditPost(n._id)}>Confirm</button>
              <button onClick={() => seteditpost(false)}>Cancel</button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <button onClick={() => editPostActivate(n)}>Update</button>
              <button type="submit" onClick={() => deleteDataById(n._id)}>
                Delete
              </button>
            </React.Fragment>
          )}
        </li>
      );
    });
  };

  const deleteDataById = (id) => {
    api
      .deleteTestById(id)
      .then(() => {
        return api.getAllTests();
      })
      .then((response) => {
        setData(response.data.data);
      });
  };

  const postDataArr = (arr) => {
    api.insertTest(arr);
  };
  console.log(data);
  return (
    <React.Fragment>
      <div className="page">
        <div className="cards">
          <div className="post">
            <TestPost user={props.user} postData={postDataArr} />
          </div>
        </div>
        <div className="get">
          {data && data.length > 0 ? <ul>{formatData()}</ul> : <p>no data</p>}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Cards;
