var Quantum = React.createClass({

  
  render: function() {
  	return(
      <tr>
        <td>{this.props.quantum.date}</td>
        <td>{this.props.quantum.total}</td>
        <td></td>
      </tr>
  	)
  }
});