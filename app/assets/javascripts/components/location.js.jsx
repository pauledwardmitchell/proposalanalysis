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
          	<Room key={room.id} room={room} onClick={this.handleToggle} />	
          )
        })}
  	  </div>
      </div>
  	)
  }

});