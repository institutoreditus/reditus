import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

// This is a temporary document to allow scrolling on
// non-index pages, like terms and privacy.
const styles = (theme: any) => ({
  "@global": {
    html: {
      ...theme.typography.html,
      overflow: "auto !important",
    },
  },
});

function MyCssBaseline() {
  return null;
}

MyCssBaseline.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyCssBaseline);
