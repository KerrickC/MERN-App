import React from 'react';

import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'





const TestDelete = (props) => {


    const deleteData = () =>{
        let deleteValue = document.getElementById('formVall').value
        props.deleteData(deleteValue)
    }

        return (
            <div className="">
                <Card className="card">
                    <h1>Delete</h1>
                    <Form>
                        <Form.Text>Enter id to delete</Form.Text>
                        <Form.Group controlId="formVal">
                            <Form.Control id="formVall"  type="string" />
                        </Form.Group>
                        <Button onClick={deleteData} variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Card>
            </div>
        )
}

export default TestDelete