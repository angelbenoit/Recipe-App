import React, {Component} from 'react';
import Modal from 'react-modal';
import '../Style/modal.css';

class ModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.getName = this.getName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getName(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {

        event.preventDefault();
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
                        <input className="formInput" type="text" placeholder="Recipe Name"/><br/><br/>
                        <textarea className="formInput" cols="30" rows="2" placeholder="ingredients (separate by commas)"/>
                        <br/><br/>
                        <textarea className="formInput" cols="30" rows="2" placeholder="instructions"/>
                    </form>
                    <br/>
                    <button id="btn" onClick={this.props.closeModal}>close</button>
                </div>
            </Modal>
        )
    }
}

export default ModalComponent;