import React, { Component } from 'react';
import Modal from 'react-modal';
import '../Style/RecipeList.css';

//when user clicks on the title of the recipe, this class will run
class ViewRecipe extends Component{
    render(){
        return(
            <Modal
                isOpen={this.props.recipeModalIsOpen}
                onRequestClose={this.props.closeRecipeModal}
                contentLabel="Example Modal"
            >
                <div className="item">
                    <h1>{this.props.recipe.name}</h1>
                    <h3>Ingredients:</h3>
                    <ul>
                        {this.props.recipe.ingredients}
                    </ul>
                    <h4>Instructions:</h4>
                    <p>{this.props.recipe.instructions}</p>
                    <button className="btn-2" onClick={this.props.closeRecipeModal}>close</button>
                </div>
            </Modal>
        )
    }
}
export default ViewRecipe;