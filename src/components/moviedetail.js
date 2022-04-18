import React, { Component } from "react";
import { fetchMovie } from "../actions/movieActions";
import { connect } from "react-redux";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { BsStarFill } from "react-icons/bs";
import { Image } from "react-bootstrap";

class MovieDetail extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    if (this.props.selectedMovie == null) {
      dispatch(fetchMovie(this.props.movieId));
    }
  }

  render() {
    const DetailInfo = () => {
      if (!this.props.selectedMovie) {
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
                <BsStarFill /> {this.props.selectedMovie[0].avgRating}
              </h4>
            </ListGroupItem>
          </ListGroup>
          <Card.Body>
            {this.props.selectedMovie[0].reviews.map((review, i) => (
              <p key={i}>
                <b>{review.name}</b>&nbsp; {review.comment}
                &nbsp; <BsStarFill /> {review.rating}
              </p>
            ))}
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

export default connect(mapStateToProps)(MovieDetail);
