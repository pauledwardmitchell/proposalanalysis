var Room = React.createClass({

  getInitialState: function() {
    return { expanded: false }
  },

  handleToggle: function(e) {
    e.preventDefault();
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3000/rooms/' + this.props.room.id,
      dataType: 'JSON',
      success: function(data) {
        this.setState({ expanded: !this.state.expanded, 
                        data: data })
       }.bind(this)
    });

  },

  renderRoomsButtons: function() {
  	return(
  	  <a className='btn' key={this.props.room.id} onClick={this.handleToggle} >
        {this.props.room.name}
      </a>
  	)
  },

  renderRoomsMachines: function() {
    return(
      <div>
        <a className='btn' key={this.props.room.id} onClick={this.handleToggle} >
          {this.props.room.name}
        </a>
        {this.state.data.map(function(machine) {
          return <Machine key={machine.id} machine={machine} />
        }

        )}

      </div>
    )
  },

  renderedRoom: function() {
  	if (this.state.expanded === true) {
  	  return this.renderRoomsMachines();
  	} else {
  	  return this.renderRoomsButtons();
  	}
  },

  render: function() {
  	return this.renderedRoom();
  }

});