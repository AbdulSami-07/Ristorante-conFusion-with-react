import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';


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