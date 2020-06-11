import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const TestGet = (props) => {
  const formatData = () => {
    return props.gdata.map((n, i) => {
      let item = i + 1;
      return (
        <li>
          <p>Item: {item}</p>
          <div>{n._id}</div>
          <div>{n.name}</div>
          <div>{n.desc}</div>
          <div>{n.author}</div>
        </li>
      );
    });
  };

  return (
    <div className="">
      <Card className="card">
        <h1>Get</h1>
        <Button onClick={props.getData}>Get Data</Button>
      </Card>
      <ul>{formatData()}</ul>
    </div>
  );
};

export default TestGet;
