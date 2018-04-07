import React, { Component } from 'react';
import EditRecipe from './EditRecipe';
import ModalComponent from './Modal';
import ViewRecipe from './ViewRecipe';
import '../Style/RecipeList.css';

class RecipeList extends Component{
    constructor(props){
        super(props);

        this.state = {
            //this modal is for adding new recipes
            modalIsOpen: false,

            //this modal is to view more information about the recipe that user clicked
            recipeModalIsOpen: false,

            //this modal opens up when user clicks on a recipe and can edit
            editRecipeModalIsOpen: false,

            //this index of the array where the edited recipe will go
            indexOfEditRecipe: -1,

            //object of recipe that user will edit
            recipeToEdit: {},

            //object of recipe that user will view
            recipeToView: {},

            //this recipe object array will hold all the recipes
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

    //===========ADD RECIPE MODALS============
    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    //==========EDIT RECIPE MODAL================
    closeEditModal() {
        this.setState({editRecipeModalIsOpen: false});
    }

    //===============VIEW RECIPE MODAL===============
    openRecipeModal(item) {
        this.setState({recipeModalIsOpen: true, recipeToView: item});
    }

    closeRecipeModal() {
        this.setState({recipeModalIsOpen: false});
    }

    //after user clicks submit, close the modal and add the recipe to our state array
    //this function will be passed in to the Modal class, which will add a new recipe
    addRecipe = (recipe) => {
        this.setState({
            modalIsOpen: false,
            recipeList: this.state.recipeList.concat(recipe)
        });
    };
    // ===============EDIT======================
    editRecipe = (id, index) => {
        /*
        This will filter the array of recipes and will get the recipe with the
        matching ID. The filter function returns an array so we will be left
        with a single element holding that one recipe object.
        */
        let filteredList = this.state.recipeList.filter(recipe => recipe.id === id);
        console.log(filteredList);
        //this filteredObject holds all the data, and will be passed to EditRecipe class
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

    //this function will be passed to EditRecipe and will pass the edited object
    //into the specified index of the recipe array list
    handleEdit = (recipe) => {
        let newArr = this.state.recipeList;
        newArr[this.state.indexOfEditRecipe] = recipe;
        console.log(newArr);
        this.setState({recipeList: newArr, editRecipeModalIsOpen: false});
    };

    //====================DELETE==============================
    deleteRecipe = (id) => {
        //filter function will return the array of array that doesn't include the
        //recipe with the target ID, then setState
          let filteredList = this.state.recipeList.filter(recipe => recipe.id !== id);
          this.setState({recipeList: filteredList});
    };

    renderItems = () => {
        //this array will hold all the data and will be returned at the end
        let data = [];
        //loop through the recipe list array and will take account for item and index
        this.state.recipeList.forEach((item, index) => {
            data.push(
                <div key={index} className="recipeItem">
                    {/*when user clicks on title, the view recipe modal will open*/}
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
                    {/*EditRecipe class will open when triggered*/}
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