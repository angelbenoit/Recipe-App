import React, { Component } from 'react';
import Modal from 'react-modal';
import "../Style/EditRecipe.css";

class EditRecipe extends Component{
    constructor(props){
        super(props);

        this.state = {
            name: "",
            ingredients: [],
            instructions: "",
            id: ""
        };
        this.editName = this.editName.bind(this);
        this.editIngredients = this.editIngredients.bind(this);
        this.editInstructions = this.editInstructions.bind(this);
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
        const customStyles = {
            content: {
                "background-color": "#c3e8cb",
                "color": "#324135",
            }
        };
        return(
            <Modal
                isOpen={this.props.editRecipeModalIsOpen}
                onRequestClose={() => this.props.closeEditModal}
                contentLabel="Example Modal"
                style={customStyles}
            >
                <div className="item">

                    <form className="edit">
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
                    <button className="btn-2" onClick={this.props.closeEditModal}>Close</button>
                    <button className="btn-2" onClick={() => this.props.handleEdit(this.state)}>Submit</button>
                </div>
            </Modal>
        )
    }
}

export default EditRecipe;