const { number, string } = React.PropTypes


const AnalysisChart = React.createClass({

  propTypes: {
    
  },

  getInitialState: function() {
  	return {
      machFactor: 23,
      incomePerDoor: 17.59,
      bonus: 2499,
      numApartments: 90,
      leaseYears: 7,
      percentToLocation: 51
  		
  	}
  },

  handleMachFactorChange: function(event) {
    this.setState({ machFactor: event.target.value})
  },

  handleIncomePerDoorChange: function(event) {
    this.setState({ incomePerDoor: event.target.value})
  },

  handleBonusChange: function(event) {
    this.setState({ bonus: event.target.value})
  },

  handleNumApartmentsChange: function(event) {
    this.setState({ numApartments: event.target.value})
  },

  handleLeaseYearsChange: function(event) {
    this.setState({ leaseYears: event.target.value })
  },

  handlePercentToLocationChange: function(event) {
    this.setState({ percentToLocation: event.target.value })
  },

  percentToWashco: function() {
    return 1 - (this.state.percentToLocation * .01)
  },

  bonusAmort: function() {
    return ((this.state.bonus / (this.state.leaseYears * 12)) / this.state.machFactor )
  },

  grossMMUA: function() {
    return this.state.incomePerDoor * this.state.numApartments / this.state.machFactor 
  },

  netMMUA: function() {
    return (this.grossMMUA() * this.percentToWashco()) - this.bonusAmort()
  },

  netIncomePercentage: function() {
    return (this.netMMUA() / this.grossMMUA()) * 100
  },

  render: function() {
  	return (

  	<div>
      <h1>Proposal Analysis</h1>
      
      <div>
        <label>Machine Factor</label>
        <input onChange={this.handleMachFactorChange} value={this.state.machFactor} />
  
        <label>Income / Door</label>
        <input onChange={this.handleIncomePerDoorChange} value={this.state.incomePerDoor} />
  
        <label>Bonus</label>
        <input onChange={this.handleBonusChange} value={this.state.bonus} />
  
        <label>Number of Apartments</label>
        <input onChange={this.handleNumApartmentsChange} value={this.state.numApartments} />
  
        <label>Lease Years</label>
        <input onChange={this.handleLeaseYearsChange} value={this.state.leaseYears} />

        <label>% to Location</label>
        <input onChange={this.handlePercentToLocationChange} value={this.state.percentToLocation} />
      </div>

      <div>
        <h2>grossMMUA: ${this.grossMMUA()}</h2>
        <h2>netMMUA: ${this.netMMUA()}</h2>
        <h3>percentToWashco: {this.percentToWashco()} %</h3>
        <h3>bonusAmort: {this.bonusAmort()} </h3>
        <h2>netIncomePercentage: {this.netIncomePercentage()}%</h2>
      </div>

    </div>
  	)
  }

})