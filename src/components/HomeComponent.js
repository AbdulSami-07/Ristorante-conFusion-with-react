import React from 'react';
import { Card, CardImg, CardSubtitle, CardText, CardBody, CardTitle } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import {FadeTransform } from 'react-animation-components';

function RenderCard({item, isLoading, errMess}) {
    
    if(isLoading){
        return (
            <div className="container">
                <div className="row">
                    <Loading /> 
                </div>
            </div>
        );
    }
    else if (errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{errMess}</h4>   
                </div>
            </div>
            
        );
    }
    else
        return(
            <FadeTransform in transformProps={{
                exitTransform : ' scale(0.5 translateY(-50%)'
            }}>
                <Card>
                    <CardImg src={baseUrl + item.image} alt={item.name} />
                    <CardBody>
                        <CardTitle>{item.name}</CardTitle>
                        {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
                        <CardText>{item.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
            
        );

}

function Home(props) {
    return (
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.dish} isLoading={props.dishLoading} errMess={props.dishErrMess} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotion} isLoading={props.promotionLoading} errMess={props.promotionErrMess} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader} isLoading={props.leaderLoading} errMess={props.leaderErrMess} />
                </div>
            </div>
        </div>
    );
}

export default Home;