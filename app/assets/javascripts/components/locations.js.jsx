var Locations = React.createClass({

  getInitialState: function() {
  	return { locations: this.props.data };
  },

  getDefaultProps: function() {
    return { locations: [] };
  },

  render: function() {
    return(
      <div className='locations'>
        <h2 className='title'>
          Your locations
        </h2>
        {this.state.locations.map(function(location) {
            return <Location key={location.id} location={location} />
          }
          )}
      </div>
    )
  }
});