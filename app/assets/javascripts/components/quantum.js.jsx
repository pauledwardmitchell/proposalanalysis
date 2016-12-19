var Quantum = React.createClass({

  render: function() {
  	return(
      <tr>
        <td>{this.state.location.quantum.date}</td>
        <td></td>
        <td></td>
        <td>{this.state.location.quantum.total}</td>
        <td></td>
      </tr>
  	)
  }
});