import React from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";

const TestPost = (props) => {

  const [newpost, setnewpost] = useState(false)

  const newPost = () => {
    setnewpost(true)
  }

  const cancelPost = () => {
    setnewpost(false)
  }

  const postData = () => {
    let title = document.getElementById("title").value;
    let desc = document.getElementById("desc").value;
    let author = document.getElementById("author").value;
    let postDataObj = {
      name: title,
      desc: desc,
      author: author,
    };

    props.postData(postDataObj);
  };

  //get author id in post
  //push to array
  //when getting data, map through allowedUsers array and find user
  //grant access

  return (
    <div className="post-form">
      {newpost ? (
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Control controlId="controlid" type="text" id="title" placeholder="Enter title" />
          </Form.Group>
          <Form.Group controlId="formDesc">
            <Form.Control
              controlId="controlid"
              type="text"
              id="desc"
              placeholder="Enter description"
            />
          </Form.Group>
          <Form.Group controlId="formAuthor">
            <Form.Control
              controlId="controlid"
              type="text"
              id="author"
              value={props.user}
              readOnly={true}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={postData}>
            Submit
          </Button>
          <Button variant="primary" onClick={cancelPost}>
            Cancel Post
          </Button>
        </Form>
      )
        :
        (<button onClick={newPost}>New Post</button>)
      }
    </div>
  );
};

export default TestPost;
