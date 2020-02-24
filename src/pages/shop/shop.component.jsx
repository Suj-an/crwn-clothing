import React from "react";
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionContainer from "../collection/collection.container";
import { Route } from "react-router-dom";

import { connect } from "react-redux";
import { fetchCollectionsStartAsync } from "../../redux/shop/shop.action";

class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
  }

  render() {
    const { match } = this.props;

    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionContainer}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(null, mapDispatchToProps)(ShopPage);
