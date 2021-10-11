import React, { Component } from "react";
import PhotoWall from "./PhotoWall";
import AddPhoto from "./AddPhoto";
import { Route, Link } from "react-router-dom";
import Single from "./Single";

class Main extends Component {
  constructor() {
    super();
  }

  state = { isLoading: true };

  componentDidMount() {
    this.props.startLoadingPost().then(() => {
      this.setState({ isLoading: false });
    });
    this.props.startLoadingComments();
  }

  render() {
    return (
      <div>
        <img className="logo" src="logo.png" href="https://www.jpdesign.tech" />
        <h1>
          <Link to="/"> PhotoWall </Link>
        </h1>
        <Route
          exact
          path="/"
          render={() => (
            <div>
              <PhotoWall {...this.props} />
            </div>
          )}
        />

        <Route
          path="/AddPhoto"
          render={({ history }) => (
            <AddPhoto {...this.props} onHistory={history} />
          )}
        />

        <Route
          path="/single/:id"
          render={(params) => (
            <Single
              loading={this.state.isLoading}
              {...this.props}
              {...params}
            />
          )}
        />
      </div>
    );
  }
}

export default Main;
