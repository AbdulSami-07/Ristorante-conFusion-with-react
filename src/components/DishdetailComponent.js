import React, { Component }from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb,
             BreadcrumbItem, Button, Label, Row, Col, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';

const required = (val) => val && val.length;
const maxLength = (len) =>(val) => !(val) || (val.length <= len); 
const minLength = (len) =>(val) => !(val) || (val.length >= len); 


class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            isModalOpen : false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen : !this.state.isModalOpen
        });
    }

    handleSubmit(values){
        console.log("Current State is : " + JSON.stringify(values));
        alert("Current State is : " + JSON.stringify(values));
    }

    render() {
        return (
        <>
            <Button color="outline-dark" onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="rating" xs={12}>Rating</Label>
                            <Col xs={12}>
                                <Control.select model=".rating" className="form-control" id="author" name="rating" defaultValue="1" >
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                                <Label htmlFor="author" xs={12}>Your Name</Label>
                                <Col xs={12}>
                                    <Control.text model=".author" className="form-control" id="author" name="author" placeholder="Your Name" 
                                    validators={{
                                        required, minLength: minLength(3),maxLength: maxLength(15)
                                    }} />
                                    <Errors className="text-danger" model=".author" show="touched" 
                                        messages={{
                                            required: "Required ",
                                            minLength: "Atleast 3 characters ",
                                            maxLength: "Max. 15 characters "
                                        }} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" xs={12}>Comment</Label>
                                <Col xs={12}>
                                    <Control.textarea model=".comment" className="form-control" id="comment" name="comment"  rows={6} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </>
        );
    }
}

function RenderDish({dish}){
    return (
        <div className="col-12 col-md-5 m-1">
            <Card >
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function RenderComments({comments}){
    const comment = comments.map( (comment) =>{
        let date = new Date(Date.parse(comment.date));
        const options = {month: 'short', day: '2-digit', year: 'numeric', };
        date = new Intl.DateTimeFormat('en-US', options).format(date);
        return (
            <li key={comment.id}>
                <p>{comment.comment}</p>
                <p><span>-- {comment.author}, </span> <span>{date}</span></p>
            </li>
        );
    });
    return (
        <div className="col-12 col-md-5 m-1">
            <h4>Comments</h4>
            <ul className="list-unstyled">
                {comment}
                <CommentForm />
            </ul>
        </div>
    );
}



const Dishdetail = (props) =>{
    if (props.dish != null){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    </div>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div> 
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        );
    }
    else {
        return (<div></div>);
    }
}


export default Dishdetail;