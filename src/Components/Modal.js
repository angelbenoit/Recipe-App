import React, {Component} from 'react';
import Modal from 'react-modal';
import '../Style/modal.css';

class ModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            ingredients: [],
            id: "",
            instructions: ""
        };

        this.getName = this.getName.bind(this);
        this.getIngredients = this.getIngredients.bind(this);
        this.getInstructions = this.getInstructions.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        Modal.setAppElement('body');
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
            instructions: this.state.instructions
        };
        this.props.addRecipe(recipe);
    }

    render(){
        return (
            <Modal
                isOpen={this.props.modalIsOpen}
                onRequestClose={this.props.closeModal}
                contentLabel="Example Modal"
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