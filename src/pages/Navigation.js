import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import Icon from "@material-ui/core/Icon";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const styles = {
  root: {
    width: 500
  }
};

class SimpleBottomNavigation extends React.Component {
  state = {
    value: 0,
    otherValue: "recents"
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleOtherChange = (event, otherValue) => {
    this.setState({ otherValue });
  };

  render() {
    const { classes } = this.props;
    const { value, otherValue } = this.state;

    return (
      <div>
        <BottomNavigation
          value={value}
          onChange={this.handleChange}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
        </BottomNavigation>

        <br />
        <br />

        <BottomNavigation
          value={otherValue}
          onChange={this.handleOtherChange}
          className={classes.root}
        >
          <BottomNavigationAction
            label="Recents"
            value="recents"
            icon={<RestoreIcon />}
          />
          <BottomNavigationAction
            label="Favorites"
            value="favorites"
            icon={<FavoriteIcon />}
          />
          <BottomNavigationAction
            label="Nearby"
            value="nearby"
            icon={<LocationOnIcon />}
          />
          <BottomNavigationAction
            label="Folder"
            value="folder"
            icon={<LocationOnIcon />}
          />
        </BottomNavigation>
      </div>
    );
  }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleBottomNavigation);
