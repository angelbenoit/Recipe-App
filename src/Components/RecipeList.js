import React, { Component } from 'react';
import Recipe from './Recipe';
import '../Style/RecipeList.css';

class RecipeList extends Component{
    constructor(props){
        super(props);

        this.state = {
            recipes: []
        }
    }
    render(){
        return (
            <div className="list">
                {this.state.recipes}
            </div>
        )
    }
}

export default RecipeList;