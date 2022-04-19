import React, { Component } from "react";
import { fetchMovie } from "../actions/movieActions";
import { connect } from "react-redux";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { BsStarFill } from "react-icons/bs";
import { Form, Button, Image } from "react-bootstrap";

class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.updateReview = this.updateReview.bind(this);
    // this.login = this.login.bind(this);

    this.state = {
      details: {
        comment: "Enter review here!",
        rating: "5",
      },
    };
  }
  updateReview(event) {
    let updateReview = Object.assign({}, this.state.details);

    updateReview[event.target.id] = event.target.value;
    this.setState({
      details: updateReview,
    });
  }

  submitReview() {
    alert(
      "Lets pretend react is easy to learn and a review was added to the db"
    );
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
    };

    return (
      <Card>
        <Card.Header>Movie Detail</Card.Header>
        <Card.Body>
          <Image
            className="image"
            src={this.props.selectedMovie.image}
            width={500}
            thumbnail
          />
        </Card.Body>
        <ListGroup>
          <ListGroupItem>{this.props.selectedMovie.title}</ListGroupItem>
          <ListGroupItem>
            <h4>Actors</h4>
            {this.props.selectedMovie.actors?.map((actor, i) => (
              <p key={i}>
                <b>{actor.actorName}</b> {actor.characterName}
              </p>
            ))}
          </ListGroupItem>
          <ListGroupItem>
            <h4>
              <BsStarFill /> {this.props.selectedMovie.avgRating.toFixed(1)}
            </h4>
          </ListGroupItem>
        </ListGroup>
        <Card.Body>
          {this.props.selectedMovie.reviews.map((review, i) => (
            <p key={i}>
              <b>{getName(review)}</b>&nbsp; {review.comment}
              &nbsp; <BsStarFill /> {review.rating}
            </p>
          ))}
        </Card.Body>
        <Form className="form-horizontal">
          <Form.Group controlId="comment">
            <Form.Label>Review</Form.Label>
            <Form.Control
              onChange={this.updateReview}
              value={this.state.details.comment}
              type="text"
              placeholder="Enter Review Here"
            />
          </Form.Group>

          <Form.Group controlId="rating">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              onChange={this.updateReview}
              value={this.state.details.rating}
              type="text"
              placeholder="Enter Rating Here"
            />
          </Form.Group>
          <Button onClick={this.submitReview}>Submit</Button>
        </Form>
      </Card>
    );
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
