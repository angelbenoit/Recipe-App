import React, { Component } from 'react';
import ModalComponent from './Modal';
import '../Style/RecipeList.css';

class RecipeList extends Component{
    constructor(props){
        super(props);

        this.state = {
            modalIsOpen: false,
            recipeList: [],
            //showDisplay will determine which item gets shown
            showDisplay: -1
        };
        this.renderItems = this.renderItems.bind(this);
        this.openModal = this.openModal.bind(this);
        this.displayDetails = this.displayDetails.bind(this);
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
                //when user clicks on div, we will send the index to the state
                <div key={index} onClick={() => this.displayDetails(index)}>
                    <h1>{item.name}</h1>
                    <p>{this.key}</p>
                    {/*if index of the div matches the current state index, then it will be displayed*/}
                    <div className={(index === this.state.showDisplay) ? "showDetails" : "hideDetails"}>
                        <ul>
                            {item.ingredients}
                        </ul>
                        <p>{item.instructions}</p>
                    </div>
                </div>
            )
        });
        return data;
    };

    //if user clicks on div, then the state will be equal to the div's index
    displayDetails = (index) => {
        this.setState({showDisplay: index})
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