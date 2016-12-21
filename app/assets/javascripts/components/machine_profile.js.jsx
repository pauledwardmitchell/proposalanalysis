var MachineProfile = React.createClass({

  getInitialState: function() {
    return { data: this.props.data };
  },

  render: function() {
  	return(
  	  <div className='machine-profile' >
        <h2>
          {this.state.data.machine.machine_type + ' - #' + this.state.data.machine.washco_no}
        </h2>
        <table className='table'>
          <thead>
            <tr>
              <th>Date</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.quanta.map(function(quantum) {
            	return <Quantum key={quantum.id} quantum={quantum} />
            }.bind(this)
            	)}
          </tbody>
        </table>
  	  </div>

  	)
  }

});