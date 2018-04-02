import React, { Component } from 'react';
import Modal from 'react-modal';
import ModalComponent from './Modal';
import '../Style/RecipeList.css';

class RecipeList extends Component{
    constructor(props){
        super(props);

        this.state = {
            modalIsOpen: false,
            recipeModalIsOpen: false,
            recipeList: []
        };
        this.renderItems = this.renderItems.bind(this);
        this.openModal = this.openModal.bind(this);
        this.openRecipeModal = this.openRecipeModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.closeRecipeModal = this.closeRecipeModal.bind(this);
        this.addRecipe = this.addRecipe.bind(this);
    };

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    openRecipeModal() {
        this.setState({recipeModalIsOpen: true});
    }

    closeRecipeModal() {
        this.setState({recipeModalIsOpen: false});
    }

    //after user clicks submit, close the modal and add the recipe to our state array
    addRecipe = (recipe) => {
        this.setState({
            modalIsOpen: false,
            recipeList: this.state.recipeList.concat(recipe)
        });
    };

    editRecipe = (id, index) => {
        let filteredList = this.state.recipeList.filter(recipe => recipe.id === id);

    };

    deleteRecipe = (id) => {
          let filteredList = this.state.recipeList.filter(recipe => recipe.id !== id);
          this.setState({
              recipeList: filteredList,
              recipeModalIsOpen: false
          });
    };

    renderItems = () => {
        const customStyles = {
            content : {
                "background-color": "#CDFFCF",
                height: '50%'
            }
        };
        let data = [];
        this.state.recipeList.forEach((item, index) => {
            data.push(
                <div key={index} className="recipeItem">
                    <h1 className="title" onClick={this.openRecipeModal}>{item.name}</h1>
                    <div className="buttonRow">
                        <div>
                            <button className="btn-2" onClick={() => this.deleteRecipe(item.id)}>Del</button>
                            <button className="btn-2">Edit</button>
                        </div>
                    </div>
                    <Modal
                        isOpen={this.state.recipeModalIsOpen}
                        onRequestClose={this.closeRecipeModal}
                        contentLabel="Example Modal"
                        style={customStyles}
                    >
                        <div className="item">
                            <h1>{item.name}</h1>
                            <h3>Ingredients:</h3>
                            <ul>
                                {item.ingredients}
                            </ul>
                            <h4>Instructions:</h4>
                            <p>{item.instructions}</p>
                            <button className="btn-2" onClick={this.closeRecipeModal}>close</button>
                        </div>
                    </Modal>
                </div>
            )
        });
        return data;
    };

    render(){
        let data = this.renderItems();
        return (
            <div>
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