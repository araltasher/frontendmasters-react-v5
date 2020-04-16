import React from "react";
import pet from "@frontendmasters/pet";
import { navigate } from "@reach/router";
import Modal from "./Modal";
import ErrorBoundary from "./ErrorBoundary";
import Carousel from "./Carousel";
import ThemeContext from "./ThemeContext";

class Details extends React.Component {
  state = { loading: true, showModal: false };

  componentDidMount() {
    pet.animal(this.props.id).then(({ animal }) => {
      this.setState({
        url: animal.url,
        name: animal.name,
        animal: animal.type,
        location: `${animal.contact.city}, ${animal.contact.state}`,
        description: animal.description,
        media: animal.photos,
        breed: animal.breeds.primary,
        loading: false,
      });
    }, console.error);
  }

  toggleModal = () =>
    this.setState({
      showModal: !this.state.showModal,
    });

  adopt = () => navigate(this.state.url);

  render() {
    if (this.state.loading) {
      return <h1>loading...</h1>;
    }

    const {
      animal,
      breed,
      location,
      description,
      name,
      media,
      showModal,
    } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <h1>Would you like to adopt {name}?</h1>
              <div className="buttons">
                <button onClick={this.adopt}>Yes</button>
                <button onClick={this.toggleModal}>Nope</button>
              </div>
            </Modal>
          ) : null}
        </>
      </div>
    );
  }
}

export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
