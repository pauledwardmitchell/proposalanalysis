var Location = React.createClass({

  getInitialState: function() {
    return { data: this.props.data };
  },

  render: function() {
  	return(
      <div className='location'>
        <h2>
          {this.props.data.location.name}
        </h2>
      <div className='rooms' >
        { this.props.data.rooms.map(function(room) {
          return ( 
          	<Room key={room.id} room={room} />	
          )
        })}
  	  </div>
      </div>
  	)
  },

  renderMachines: function() {
  	return(
      <div>
        <h4>
          { this.props.data.machines.map(function(machine) {
          	return(
          	  <p>
              {machine.machine_type} / 
              {machine.model_year} / 
              {machine.washco_no}
              </p>
          	)
          }

          	)}
        </h4>
      </div>
  	)
  },



});