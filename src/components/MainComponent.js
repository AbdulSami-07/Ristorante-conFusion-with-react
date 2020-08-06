import React, {Component} from 'react';
import { Switch, Route, Redirect, withRouter }  from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './HeaderComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Footer from './FooterComponent'
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { fetchDishes, fetchComments, fetchPromos, postComment } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';



const mapStateToProps = state =>{ // in state.* e.g. state.dishes dishes is the reducer function defined in createStore. 
  return {
    dishes: state.dishes,
    comments : state.comments,
    promotions : state.promotions,
    leaders : state.leaders
  };
};

const mapDispatchToProps = (dispatch) =>{
  return ({
    postComment: (dishId,rating,author,comment) => dispatch(postComment(dishId,rating,author,comment)),
    fetchDishes: () =>{dispatch(fetchDishes())},
    fetchComments: () =>{dispatch(fetchComments())},
    fetchPromos: () =>{dispatch(fetchPromos())},
    resetFeedbackForm : () =>{dispatch(actions.reset('feedback'))}
  });
};

class Main extends Component {
  
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }

  render() {
    const HomePage = () => {
        return (
            <Home dish={this.props.dishes.dishes.filter(dish => dish.featured === true)[0]}
                dishLoading={this.props.dishes.isLoading}
                dishErrMess={this.props.dishes.errMess}
                promotion={this.props.promotions.promotions.filter(promotion => promotion.featured === true)[0]}
                promotionLoading={this.props.promotions.isLoading}
                promotionErrMess={this.props.promotions.errMess}
                leader = {this.props.leaders.filter(leader => leader.featured === true)[0]}
             />
        );
    }

    const DishWithId = ({match}) =>{
        return(
            <Dishdetail dish={this.props.dishes.dishes.filter((dish)=>dish.id === parseInt(match.params.dishId,10))[0]}
                isLoading={this.props.dishes.isLoading}
                errMess = {this.props.dishes.errMess} 
                comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                commentsErrMess = {this.props.comments.errMess}
                postComment={this.props.postComment}
            />
        );
    }

    return (
      <div>
        <Header />
        <Switch>
            <Route path="/home" component={HomePage} />
            <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
            <Route path="/menu/:dishId" component={DishWithId} />
            <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} /> } />
            <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
            <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
