var Machine = React.createClass({

  render: function() {
  	return(
  	  <div className='machine' >
        <a href={'http://localhost:3000/machines/' + this.props.machine.id} className='btn btn-default'  >
          {this.props.machine.machine_type + ' - #' + this.props.machine.washco_no }
        </a>      
  	  </div>

  	)
  }
})