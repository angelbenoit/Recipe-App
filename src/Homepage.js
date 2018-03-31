import React, { Component } from 'react';
import ModalComponent from './Components/Modal';
import RecipeList from './Components/RecipeList';
import './Style/homepage.css';

class Homepage extends Component {
    constructor(props){
        super(props);

        this.state = {
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    render() {
        return (
          <div>
              <RecipeList/>
              <button id="add-recipe" onClick={this.openModal}>
                  Add Recipe
              </button>
              <ModalComponent
                  modalIsOpen={this.state.modalIsOpen}
                  closeModal={this.closeModal}
              />
          </div>
        );
    }
}

export default Homepage;
