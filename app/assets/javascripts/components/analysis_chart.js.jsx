const { number, string } = React.PropTypes


const AnalysisChart = React.createClass({

  // propTypes: {
    
  // },

  getInitialState: function() {
  	return {
      machFactor: 23, //split into 4 types
      incomePerDoor: 17.59,
      bonus: 1500,
      redec: 995,
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

  handleRedecChange: function(event) {
    this.setState({ redec: event.target.value })
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

  totalBonus: function() {
    return this.state.bonus + this.state.redec
  },

  bonusMonthlyAmort: function() {
    return this.state.bonus / this.leaseMonths()
  },

  redecMonthlyAmort: function() {
    return this.state.redec / this.leaseMonths() 
  },

  grossMMUA: function() {
    return this.state.incomePerDoor * this.state.numApartments / this.state.machFactor 
  },

  monthlyGrossCollections: function() {
    return this.state.incomePerDoor * this.state.numApartments
  },

  monthlyRentToLocation: function() {
    return this.monthlyGrossCollections() * this.state.percentToLocation / 100
  },

  netMMUA: function() {
    return (this.grossMMUA() * this.percentToWashco()) - (this.bonusMonthlyAmort() / this.state.machFactor)
  },

  netIncomePercentage: function() {
    return "still waiting"
  },

  // costOfServiceCollectionsAdmin: function() {
  //   return this.state.machFactor * this.leaseMonths() * 12 //why times 12? Months already factored in?
  // },

  leaseMonths: function() {
    return this.state.leaseYears * 12
  },

  contingency: function() {
    return 43
  },

  interest: function() {
    return .0133 / 2 // how is this calculated?
  },

  interestOnLeaseBonus: function() {
    return this.state.bonus * this.interest() 
  },

  totalMonthlyCommissionExpense: function() {
    return this.monthlyRentToLocation() + this.bonusMonthlyAmort() + this.interestOnLeaseBonus()
  },

  monthlyIncomeAfterCommission: function() {
    return this.monthlyGrossCollections() - this.totalMonthlyCommissionExpense()
  },

  monthlyServiceCollectionsAdminCost: function() {
    return this.state.machFactor * 10.02 //why this number?
  },

  redecMonthlyDepreciation: function() {
    return this.state.redec / this.leaseMonths()
  },
  
  totalMonthlyWasherDepreciation: function() {
    
  },

  totalMonthlyLargeWasherDepreciation: function() {
  
  },

  totalMonthlyLargeDryerDepreciation: function() {

  },

  totalMonthlySmallDryerDepreciation: function() {

  },

  totalMonthlyMachineDepreciation: function() {
    return this.totalMonthlyWasherDepreciation() + this.totalMonthlyLargeWasherDepreciation() + this.totalMonthlyLargeDryerDepreciation() + this.totalMonthlySmallDryerDepreciation()
  },

  totalMonthlyDepreciation: function() {
    return totalMonthlyMachineDepreciation() + redecMonthlyDepreciation()
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

        <label>Redec</label>
        <input onChange={this.handleRedecChange} value={this.state.redec} />
  
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
        <h2>netIncomePercentage: {this.netIncomePercentage()}%</h2>
        <h2>breakEvenMonths: </h2>

        <h4>grossOverContract: </h4>
        <h4>rentOverContract: </h4>
        <h4>Rent + Bonus: </h4>
        <h4>revenueOverContract: </h4>
        <h4>Revenue - All Costs</h4>


        <h1>- - - - - - - </h1>
        <h2>monthlyGrossCollections: {this.monthlyGrossCollections()}</h2>
        <h2>MONTHLY COMMISSION EXPENSE:</h2>
        <h3>monthlyRentToLocation: { this.monthlyRentToLocation() }</h3>
        <h3>bonusMonthlyAmort: { this.bonusMonthlyAmort() }</h3>
        <h3>interestOnLeaseBonus: { this.interestOnLeaseBonus() }</h3>
        <h3>totalMonthlyCommissionExpense: { this.totalMonthlyCommissionExpense() }</h3>
        <h3>monthlyIncomeAfterCommission: { this.monthlyIncomeAfterCommission() }  </h3>
        <h1>- - - - - - - </h1>
        <h2>OTHER MONTHLY EXPENSES:</h2>
        <h3>monthlyServiceCollectionsAdminCost: { this.monthlyServiceCollectionsAdminCost() }</h3>

      </div>

    </div>
  	)
  }

})