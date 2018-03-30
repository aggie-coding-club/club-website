import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';

export default class CustomSnackbar extends React.Component{
  render(){
    return(
      <Snackbar
          style={{ height: 30, width: 100 }}
          anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
          }}
          open={this.props.open}
          autoHideDuration={6000}
          onClose={this.props.handleClose}
          SnackbarContentProps={{
              'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">There was a error pulling data from Github</span>}
          action={[
              <Button key="undo" color="accent" dense onClick={this.props.handleClose}>
                  DISMISS
              </Button>,
          ]}
      />
    );
  }
}
