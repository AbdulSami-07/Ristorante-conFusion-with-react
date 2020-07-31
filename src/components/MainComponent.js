import React, {Component} from 'react';
import { Switch, Route, Redirect }  from 'react-router-dom';
import Header from './HeaderComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Footer from './FooterComponent'
import Home from './HomeComponent';
import Contact from './ContactComponent';
import { DISHES } from '../shared/dishes';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import { COMMENTS } from '../shared/comments';




class Main extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      dishes : DISHES,
      comments : COMMENTS,
      promotions : PROMOTIONS,
      leaders : LEADERS,
      selectedDish : null
    }
  }

    // onDishSelect(dishId) {
    //     this.setState({
    //         selectedDish: dishId
    //     });
    // }

  render() {
    const HomePage = () => {
        return (
            <Home dish={this.state.dishes.filter(dish => dish.featured === true)[0]}
                promotion={this.state.promotions.filter(promotion => promotion.featured === true)[0]}
                leader={this.state.leaders.filter(leader => leader.featured === true)[0]}
             />
        );
    }
    return (
      <div>
        <Header />
        <Switch>
            <Route path="/home" component={HomePage} />
            <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
            <Route exact path="/contactus" component={Contact} />
            <Redirect to="/home" />
        </Switch>
        
        <Footer />
      </div>
    );
  }

}
export default Main;

{/* <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)}/>
        <Dishdetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} /> */}