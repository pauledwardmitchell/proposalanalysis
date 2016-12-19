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
      <table className='table'>
        <thead>
          <tr>
            <th>'Date'</th>
            <th>'Amount - Washers'</th>
            <th>'Amount - Dryers'</th>
            <th>'Total'</th>
            <th>'Actions'</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
      </div>
    )
  }
});