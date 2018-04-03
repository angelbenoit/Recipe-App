import React, { Component } from 'react';
import Modal from 'react-modal';
import '../Style/RecipeList.css';

class EditRecipe extends Component{
    constructor(props){
        super(props);
    }

    editName(event) {
        this.setState({name: event.target.value});
    }
    editIngredients(event) {
        //split the string into array and separate using commas
        let separator = event.target.value.split(",");
        //fill array with the ingredients with a li element to display the list
        let ingredientList = separator.map(ingredient => {
            return <li key={ingredient}>{ingredient}</li>
        });
        this.setState({ingredients: ingredientList});
    }

    editInstructions(event) {
        this.setState({instructions: event.target.value});
    }
    render(){
        return(
            <Modal
                isOpen={this.props.isOpen}
                onRequestClose={() => this.setState({editRecipeModalIsOpen: false})}
                contentLabel="Example Modal"
                style={customStyles}
            >
                <div className="item">

                    <form>
                        <input onChange={this.editName} className="formInput" type="text" placeholder="Recipe Name"/><br/><br/>
                        <textarea
                            onChange={this.editIngredients}
                            className="formInput"
                            cols="30"
                            rows="2"
                            placeholder="ingredients (separate by commas)"/>
                        <br/><br/>
                        <textarea
                            onChange={this.editInstructions}
                            className="formInput"
                            cols="30"
                            rows="2"
                            placeholder="instructions"/>
                    </form>
                    <br/>
                    <button className="btn-2" onClick={this.props.onRequestClose}>Close</button>
                    <button className="btn-2" onClick={this.handleSubmit}>Submit</button>
                </div>
            </Modal>
        )
    }
}

export default EditRecipe;