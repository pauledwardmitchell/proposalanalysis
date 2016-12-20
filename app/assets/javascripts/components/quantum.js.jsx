var Quantum = React.createClass({

  render: function() {
  	return(
      <tr>
        <td>{this.props.location.quantum.date}</td>
        <td></td>
        <td></td>
        <td>{this.props.location.quantum.total}</td>
        <td></td>
      </tr>
  	)
  }
});