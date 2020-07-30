import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class Dishdetail extends Component {
    
    render() {
        if (this.props.dish != null){
            console.log("in");
            return (
                <div className="container">
                    <div className="row">
                        {this.renderDish(this.props.dish)}
                        {this.renderComments(this.props.dish.comments)}
                    </div>
                </div>
            );
        }
        else {
            return (<div></div>);
        }
    }

    renderDish(dish){
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

    renderComments(comments){
        const comment = comments.map(comment =>{
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
}

export default Dishdetail;