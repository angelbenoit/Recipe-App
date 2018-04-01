import React, { Component } from 'react';
import ModalComponent from './Modal';
import '../Style/RecipeList.css';

class RecipeList extends Component{
    constructor(props){
        super(props);

        this.state = {
            modalIsOpen: false,
            recipeList: []
        };
        this.renderItems = this.renderItems.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.addRecipe = this.addRecipe.bind(this);
    };

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    //after user clicks submit, close the modal and add the recipe to our state array
    addRecipe = (recipe) => {
        this.setState({
            modalIsOpen: false,
            recipeList: this.state.recipeList.concat(recipe)
        });
    };

    renderItems = () => {
        let data = [];
        this.state.recipeList.forEach((item, index) => {
            data.push(
                <div className="container" key={index}>
                        <h1>{item.name}</h1>

                    <div className="overlay">
                        <div className="item">
                            <h1>{item.name}</h1>
                            <h3>Ingredients:</h3>
                            <ul>
                                {item.ingredients}
                            </ul>
                            <h4>Instructions:</h4>
                            <p>{item.instructions}</p>
                            <div className="buttonRow">
                                <button className="btn-2">Del</button>
                                <button className="btn-2">Edit</button>
                            </div>
                        </div>
                    </div>

                </div>
            )
        });
        return data;
    };

    render(){
        let data = this.renderItems();
        return (
            <div className="list">
                <button id="add-recipe" onClick={this.openModal}>
                    <strong>+</strong> Add Recipe
                </button>
                {data}
                <ModalComponent
                    //send the modalIsOpen variable and closeModal, addRecipe methods to class
                    modalIsOpen={this.state.modalIsOpen}
                    closeModal={this.closeModal}
                    addRecipe={this.addRecipe}
                />
            </div>
        )
    }
}

export default RecipeList;