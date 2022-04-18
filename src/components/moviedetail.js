import React, { Component } from "react";
import { fetchMovie } from "../actions/movieActions";
import { connect } from "react-redux";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { BsStarFill } from "react-icons/bs";
import { Form, Button, Image } from "react-bootstrap";

class MovieDetail extends Component {
  constructor(props) {
    super(props);
    // this.updateDetails = this.updateDetails.bind(this);
    // this.login = this.login.bind(this);

    this.state = {
      details: {
        comment: "0",
        rating: "1",
      },
    };
  }

  updateDetails(event) {
    let updateDetails = Object.assign({}, this.state.details);

    updateDetails[event.target.id] = event.target.value;
    this.setState({
      details: updateDetails,
    });

    const { dispatch } = this.props;
    console.log(this.state.details);
    // dispatch(submitLogin(this.state.details));
  }

  componentDidMount() {
    const { dispatch } = this.props;
    if (this.props.selectedMovie == null) {
      dispatch(fetchMovie(this.props.movieId));
    }
  }

  render() {
    const DetailInfo = () => {
      if (!this.props.selectedMovie[0]) {
        return <div>Loading....</div>;
      }

      return (
        <Card>
          <Card.Header>Movie Detail</Card.Header>
          <Card.Body>
            <Image
              className="image"
              src={this.props.selectedMovie[0].image}
              width={500}
              thumbnail
            />
          </Card.Body>
          <ListGroup>
            <ListGroupItem>{this.props.selectedMovie[0].title}</ListGroupItem>
            <ListGroupItem>
              <h4>Actors</h4>
              {this.props.selectedMovie[0].actors.map((actor, i) => (
                <p key={i}>
                  <b>{actor.actorName}</b> {actor.characterName}
                </p>
              ))}
            </ListGroupItem>
            <ListGroupItem>
              <h4>
                <BsStarFill />{" "}
                {this.props.selectedMovie[0].avgRating.toFixed(1)}
              </h4>
            </ListGroupItem>
          </ListGroup>
          <Card.Body>
            {this.props.selectedMovie[0].reviews.map((review, i) => (
              <p key={i}>
                <b>{getName(review)}</b>&nbsp; {review.comment}
                &nbsp; <BsStarFill /> {review.rating}
              </p>
            ))}

            <Form className="form-horizontal">
              <Form.Group controlId="username">
                <Form.Label>Review</Form.Label>
                <Form.Control
                  value={this.state.details.username}
                  type="email"
                  placeholder="Enter review"
                />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  value={this.state.details.password}
                  type="text"
                  placeholder="Rating"
                />
              </Form.Group>
              <Button onClick={this.updateDetails}>Submit</Button>
            </Form>
          </Card.Body>
        </Card>
      );
    };

    return <DetailInfo />;
  }
}

const mapStateToProps = (state) => {
  return {
    selectedMovie: state.movie.selectedMovie,
  };
};

function getName(review) {
  return review.name == null ? "Anonymous" : review.name;
}

export default connect(mapStateToProps)(MovieDetail);
