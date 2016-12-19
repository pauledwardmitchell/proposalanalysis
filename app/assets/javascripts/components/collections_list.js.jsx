var CollectionsList = React.createClass({

  render: function() {
  	return(
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
          {location.quanta.map(function(quantum) {
          	return <Quantum key={quantum.id} quantum={quantum} />
          }.bind(this)
          	)}
        </tbody>
      </table>
  	)
  }
});