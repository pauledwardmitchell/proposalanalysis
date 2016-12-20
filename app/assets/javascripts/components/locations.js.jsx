var Locations = React.createClass({

  getInitialState: function() {
  	return { locations: this.props.data };
  },

  render: function() {
    return(
      <div className='locations'>
        <h2 className='title'>
          Your locations
        </h2>
        {this.props.data.map(function(location) {
            return <Location key={location.id} location={location} />
          }
          )}
      </div>
    )
  }
});