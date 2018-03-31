import React, { Component } from 'react';
import RecipeList from './Components/RecipeList';
import './Style/homepage.css';

class Homepage extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
          <div>
              <RecipeList/>
          </div>
        );
    }
}

export default Homepage;
