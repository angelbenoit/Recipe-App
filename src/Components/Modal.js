import React, {Component} from 'react';
import Modal from 'react-modal';
import uuid from 'uuid';
import '../Style/modal.css';

class ModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            ingredients: [],
            id: "",
            instructions: "",
            fillOut: false
        };

        this.getName = this.getName.bind(this);
        this.getIngredients = this.getIngredients.bind(this);
        this.getInstructions = this.getInstructions.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetState = this.resetState.bind(this);
    }

    componentWillMount() {
        Modal.setAppElement('body');
        console.log(uuid());
    }

    getName(event) {
        this.setState({name: event.target.value});
    }
    getIngredients(event) {
        //split the string into array and separate using commas
        let separator = event.target.value.split(",");
        //fill array with the ingredients with a li element to display the list
        let ingredientList = separator.map(ingredient => {
            return <li key={ingredient}>{ingredient}</li>
        });
        this.setState({ingredients: ingredientList});
    }

    getInstructions(event) {
        this.setState({instructions: event.target.value});
    }

    handleSubmit() {
        let recipe = {
            name: this.state.name,
            ingredients: this.state.ingredients,
            instructions: this.state.instructions,
            id: uuid()
        };
        console.log(recipe);
        //if the user did not enter any data, the submit button won't work
        //if the user entered data, the recipe will be added to recipe array list and the state
        //of this class will be reset
        if((recipe.name.length > 0) && (recipe.ingredients.length > 0) && (recipe.instructions.length > 0)){
            this.props.addRecipe(recipe);
            this.resetState();
        }
    }

    resetState = () => {
      this.setState({
            name: "",
            ingredients: [],
            id: "",
            instructions: "",
            fillOut: false
      })
    };

    render(){
        const customStyles = {
            content : {
                background: "#44a83f",
                border: "5px solid black"
            }
        };
        return (
            <Modal
                isOpen={this.props.modalIsOpen}
                onRequestClose={this.props.closeModal}
                contentLabel="Example Modal"
                style={customStyles}
            >
                <div id="modal">
                    <h2>Add A Recipe</h2>
                    <form>
                        <input onChange={this.getName} className="formInput" type="text" placeholder="Recipe Name"/><br/><br/>
                        <textarea
                            onChange={this.getIngredients}
                            className="formInput"
                            cols="30"
                            rows="2"
                            placeholder="ingredients (separate by commas)"/>
                        <br/><br/>
                        <textarea
                            onChange={this.getInstructions}
                            className="formInput"
                            cols="30"
                            rows="2"
                            placeholder="instructions"/>
                    </form>
                    <br/>
                    <button id="btn" onClick={this.props.closeModal}>Close</button>
                    <button id="btn" onClick={this.handleSubmit}>Submit</button>
                </div>
            </Modal>
        )
    }
}

export default ModalComponent;