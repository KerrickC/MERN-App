import React  from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useEffect } from 'react'


const TestPost = (props) => {

    

    const postData = () => {
        let title = document.getElementById('title').value
        let desc = document.getElementById('desc').value
        let author = document.getElementById('author').value
        let postDataObj= {
            'name': title,
            'desc': desc,
            'author': author,
            // 'allowedUsers': [props.user]
        }

        props.postData(postDataObj)
    }

  

    //get author id in post
    //push to array
    //when getting data, map through allowedUsers array and find user
    //grant access



    return (
        <div className="">
            <Card className="card">
                <h1>Post</h1>
                <Form>
                    <Form.Group controlId="formTitle">
                        <Form.Control type="text" id="title" placeholder="Enter title" />
                    </Form.Group>
                    <Form.Group controlId="formDesc">
                        <Form.Control type="text" id="desc" placeholder="Enter description" />
                    </Form.Group>
                    <Form.Group controlId="formAuthor">
                        <Form.Control type="text" id="author" value={props.user} readOnly={true} />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={postData}>
                        Submit
                        </Button>
                </Form>
            </Card>
        </div>
    )
}


export default TestPost