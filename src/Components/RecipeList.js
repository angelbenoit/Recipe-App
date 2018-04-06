import React, { Component } from 'react';
import EditRecipe from './EditRecipe';
import ModalComponent from './Modal';
import ViewRecipe from './ViewRecipe';
import '../Style/RecipeList.css';

class RecipeList extends Component{
    constructor(props){
        super(props);

        this.state = {
            modalIsOpen: false,
            recipeModalIsOpen: false,
            editRecipeModalIsOpen: false,
            indexOfEditRecipe: -1,
            recipeToEdit: {},
            recipeToView: {},
            recipeList: []
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.renderItems = this.renderItems.bind(this);
        this.openModal = this.openModal.bind(this);
        this.openRecipeModal = this.openRecipeModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.closeEditModal = this.closeEditModal.bind(this);
        this.closeRecipeModal = this.closeRecipeModal.bind(this);
        this.addRecipe = this.addRecipe.bind(this);
    };

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    closeEditModal() {
        this.setState({editRecipeModalIsOpen: false});
    }
    openRecipeModal(item) {
        this.setState({recipeModalIsOpen: true, recipeToView: item});
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
    // ===============EDIT======================
    editRecipe = (id, index) => {
        let filteredList = this.state.recipeList.filter(recipe => recipe.id === id);
        console.log(filteredList);
        let filteredObject = {
            name: filteredList[0].name,
            ingredients: filteredList[0].ingredients,
            instructions: filteredList[0].instructions,
            id: filteredList[0].id
        };
        this.setState({
            editRecipeModalIsOpen: true,
            recipeToEdit: filteredObject,
            indexOfEditRecipe: index
        });
    };

    handleEdit = (recipe) => {
        let newArr = this.state.recipeList;
        newArr[this.state.indexOfEditRecipe] = recipe;
        console.log(newArr);
        this.setState({recipeList: newArr, editRecipeModalIsOpen: false});
    };

    //====================DELETE==============================
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
            }
        };
        let data = [];
        this.state.recipeList.forEach((item, index) => {
            data.push(
                <div key={index} className="recipeItem">
                    <h1 className="title" onClick={() => this.openRecipeModal(item)}>{item.name}</h1>
                    <div className="buttonRow">
                        <div>
                            <button className="btn-2" onClick={() => this.deleteRecipe(item.id)}>Del</button>
                            <button className="btn-2" onClick={() => this.editRecipe(item.id, index)}>Edit</button>
                        </div>
                    </div>
                    {/*this first modal is just to view the information on the recipe that user clicked on*/}
                    <ViewRecipe
                        recipe={this.state.recipeToView}
                        recipeModalIsOpen={this.state.recipeModalIsOpen}
                        closeRecipeModal={this.closeRecipeModal}
                    />
                    <EditRecipe
                        handleEdit={this.handleEdit}
                        closeEditModal={this.closeEditModal}
                        editRecipeModalIsOpen={this.state.editRecipeModalIsOpen}
                        recipeToEdit={this.state.recipeToEdit}
                        indexOfEditRecipe={this.state.indexOfEditRecipe}
                    />
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