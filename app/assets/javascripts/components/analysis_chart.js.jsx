const { number, string } = React.PropTypes


const AnalysisChart = React.createClass({

  // propTypes: {
  //   washers: number.isRequired,
  //   lgWashers: number.isRequired,
  //   lgDryers: number.isRequired,
  //   smDryers: number.isRequired,
  //   incomePerDoor: number.isRequired,
  //   bonus: number.isRequired,
  //   redec: number.isRequired,
  //   numApartments: number.isRequired,
  //   leaseYears: number.isRequired,
  //   percentToLocation: number.isRequired
  // },

  getInitialState: function() {
  	return {
  	  washers: 12,
  	  lgWashers: 0,
  	  lgDryers: 4,
  	  smDryers: 3,
      incomePerDoor: 17.59,
      bonus: 1500,
      redec: 995,
      numApartments: 90,
      leaseYears: 7,
      percentToLocation: 51
  		
  	}
  },

  handleWashersChange: function(event) {
    this.setState({ washers: event.target.value})
  },

  handleLgWashersChange: function(event) {
    this.setState({ lgWashers: event.target.value})
  },

  handleLgDryersChange: function(event) {
    this.setState({ lgDryers: event.target.value})
  },

  handleSmDryersChange: function(event) {
    this.setState({ smDryers: event.target.value})
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

  machFactor: function() {
    return parseInt(this.state.washers) + parseInt(this.state.lgWashers) + parseInt((this.state.lgDryers * 2)) + parseInt(this.state.smDryers) //why lgDryers *2? 
  },

  percentToWashco: function() {
    return 100 - this.state.percentToLocation
  },

  percentToWashcoToDec: function() {
  	return this.percentToWashco() * .01
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
    return this.state.incomePerDoor * this.state.numApartments / this.machFactor() 
  },

  monthlyGrossCollections: function() {
    return this.state.incomePerDoor * this.state.numApartments
  },

  monthlyRentToLocation: function() {
    return this.monthlyGrossCollections() * this.state.percentToLocation / 100
  },

  netMMUA: function() {
    return (this.grossMMUA() * this.percentToWashcoToDec()) - (this.bonusMonthlyAmort() / this.machFactor()) //should this be calculated after all costs, not just amort of bonus?
  },

  netIncomePercentage: function() {
    return this.monthlyNetIncomeForLocation() / this.monthlyGrossCollections() * 100
  },

  netIncomePercentageToDec: function() {
    return this.monthlyNetIncomeForLocation() / this.monthlyGrossCollections()
  },

  breakEvenMonths: function() {
    return this.totalUpFrontCost() / this.monthlyNetIncomeForLocation() 
    // this is different than spreadsheet... 
    // spreadsheet has doors * money/door * % in demoninator
  },

  // costOfServiceCollectionsAdmin: function() {
  //   return this.machFactor() * this.leaseMonths() * 12 //why times 12? Months already factored in?
  // },

  leaseMonths: function() {
    return this.state.leaseYears * 12
  },

  contingency: function() {
    return ((this.totalEquipmentCost() + this.totalBonus()) / 2) * .0042 // how is this calculated? / This same figure if used in the monthly analysis and life of the contract analysis
  },

  interest: function() {
    return .0133 / 2 // how is this calculated?
  },

  interestOnLeaseBonus: function() {
    return this.state.bonus * this.interest() 
  },

  interestOnRedec: function() {
    return this.state.redec / 2 * .0133
  },

  totalMonthlyCommissionExpense: function() {
    return this.monthlyRentToLocation() + this.bonusMonthlyAmort() + this.interestOnLeaseBonus()
  },

  monthlyIncomeAfterCommission: function() {
    return this.monthlyGrossCollections() - this.totalMonthlyCommissionExpense()
  },

  monthlyServiceCollectionsAdminCost: function() {
    return this.machFactor() * 10.02 //why this number?
  },

  redecMonthlyDepreciation: function() {
    return this.state.redec / this.leaseMonths()
  },

  totalWashersCost: function() {
    return this.state.washers * 823.65
  },

  totalLgWashersCost: function() {
    return this.state.lgWashers * 1278.40
  },

  totalLgDryersCost: function() {
    return this.state.lgDryers * 1540.10
  },

  totalSmDryersCost: function() {
    return this.state.smDryers * 709.75
  },

  totalEquipmentCost: function() {
    return this.totalWashersCost() + this.totalLgWashersCost() + this.totalLgDryersCost() + this.totalSmDryersCost()
  },

  totalUpFrontCost: function() {
    return this.totalEquipmentCost() + this.totalBonus()
  },
  
  totalMonthlyWasherDepreciation: function() {
    return this.totalWashersCost() / this.leaseMonths() // A machine's life is 7 years? So hardcode it?
  },

  totalMonthlyLargeWasherDepreciation: function() {
    return this.totalLgWashersCost() / this.leaseMonths()
  },

  totalMonthlyLargeDryerDepreciation: function() {
    return this.totalLgDryersCost() / this.leaseMonths()
  },

  totalMonthlySmallDryerDepreciation: function() {
    return this.totalSmDryersCost() / this.leaseMonths()
  },

  totalMonthlyMachineDepreciation: function() {
    return this.totalMonthlyWasherDepreciation() + this.totalMonthlyLargeWasherDepreciation() + this.totalMonthlyLargeDryerDepreciation() + this.totalMonthlySmallDryerDepreciation()
  },

  totalMonthlyDepreciation: function() {
    return this.totalMonthlyMachineDepreciation() + this.redecMonthlyDepreciation()
  },

  totalOtherMonthlyCosts: function() {
    return this.monthlyServiceCollectionsAdminCost() + this.totalMonthlyDepreciation() + this.interestOnRedec() + this.contingency()
  },

  monthlyNetIncomeForLocation: function() {
    return this.monthlyIncomeAfterCommission() - this.totalOtherMonthlyCosts()
  },

  grossOverContract: function() {
    return this.state.incomePerDoor * this.state.numApartments * this.leaseMonths()
  },

  rentOverContract: function() {
    return this.grossOverContract() * this.state.percentToLocation / 100
  },

  totalPaidOutToCustomerOverContract: function() {
    return this.rentOverContract() + this.totalBonus()
  },

  netRevenueOverContract: function() {
    return this.grossOverContract() - this.rentOverContract()
  },

  netRevenueOverContractMinusContractCosts: function() {
    return this.netRevenueOverContract() - this.allContractCostsOverContract()
  },

  allContractCostsOverContract: function() {
    return this.totalEquipmentCost() + this.totalBonus()
  },

  allInternalCostsOverContract: function() {
    return this.totalOtherMonthlyCosts() * this.leaseMonths()
  },

  netRevenueOverContractMinusContractAndInternalCosts: function() {
    return this.monthlyNetIncomeForLocation() * this.leaseMonths() //This includes contingency for every month of contract, not just once as in cash flow section
  },

  render: function() {
  	return (

  	<div>
      <h1>Proposal Analysis</h1>

      <div>
        <table className='b-table'>
          <thead>
            <tr>
              <th>Lease Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='sub a-tooltip'>
                Equipment Details
                <span className='a-tooltip tooltiptext'>Mach Factor: { this.machFactor() }</span>
              </td>
            </tr>
            <tr>
              <td><label>Washers</label></td>
              <td><input onChange={this.handleWashersChange} value={this.state.washers} /></td>
            </tr>
            <tr>
              <td><label>LgWashers</label></td>
              <td><input onChange={this.handleLgWashersChange} value={this.state.lgWashers} /></td>
            </tr>
            <tr>
	          <td><label>LgDryers</label></td>
	          <td><input onChange={this.handleLgDryersChange} value={this.state.lgDryers} /></td>
	        </tr>
	        <tr>
	          <td><label>SmDryers</label></td>
	          <td><input onChange={this.handleSmDryersChange} value={this.state.smDryers} /></td>
            </tr>
            <tr>
              <td><strong>Lease Variables</strong></td>
            </tr>
            <tr>
	          <td><label>Lease Years</label></td>
	          <td><input onChange={this.handleLeaseYearsChange} value={this.state.leaseYears} /></td>
            </tr>
            <tr>
	          <td><label>% to Location</label></td>
	          <td><input onChange={this.handlePercentToLocationChange} value={this.state.percentToLocation} /></td>
            </tr>
            <tr>
	          <td><label>Bonus</label></td>
	          <td><input onChange={this.handleBonusChange} value={this.state.bonus} /></td>
	        </tr>
	        <tr>
	          <td><label>Redec</label></td>
	          <td><input onChange={this.handleRedecChange} value={this.state.redec} /></td>
            </tr>
            <tr>
              <td><strong>Location Details</strong></td>
            </tr>
            <tr>
	          <td><label>Income / Door</label></td>
	          <td><input onChange={this.handleIncomePerDoorChange} value={this.state.incomePerDoor} /></td>
	        </tr>
	        <tr>
	          <td><label>Number of Apartments</label></td>
	          <td><input onChange={this.handleNumApartmentsChange} value={this.state.numApartments} /></td>
            </tr>
          </tbody>
        </table>

        <table className='a-table'>
          <thead>
            <tr>
              <th>Monthly Analysis</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Gross MMUA: ${this.grossMMUA().toFixed(2) }</td>
            </tr>
            <tr>
              <td>Net MMUA: ${this.netMMUA().toFixed(2) }</td>
            </tr>
            <tr>
              <td>Net Income Percentage (after all costs): {this.netIncomePercentage().toFixed(2) }%</td>
            </tr>
            <tr>
            </tr>
            <tr>
              <td></td>
            </tr>
            <tr>
              <td>Monthly Gross Collections: ${this.monthlyGrossCollections().toFixed(2) }</td>
            </tr>
          </tbody>
        </table>

        <table className='a-table'>
          <thead>
            <tr>
              <th>Monthly Commission Expense</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Monthly Rent To Location: ${ this.monthlyRentToLocation().toFixed(2) }</td>
            </tr>
            <tr>
              <td>Monthly Amort of Lease Bonus: ${ this.bonusMonthlyAmort().toFixed(2) }</td>
            </tr>
            <tr>
              <td>Interest On Lease Bonus: ${ this.interestOnLeaseBonus().toFixed(2) }</td>
            </tr>
            <tr className='a-tooltip'>
              <td>
                Total Monthly Commission Expense: ${ this.totalMonthlyCommissionExpense().toFixed(2) }
                <span className='a-tooltip tooltiptext'>
                  <ul>
                    <li>Monthly Rent To Location: ${ this.monthlyRentToLocation().toFixed(2) }</li>
                    <li>Monthly Amort of Lease Bonus: ${ this.bonusMonthlyAmort().toFixed(2) }</li>
                    <li>Interest On Lease Bonus: ${ this.interestOnLeaseBonus().toFixed(2) }</li>
                  </ul>
                </span>
              </td>
            </tr>
            <tr>
              <td className='box'>Monthly Income After Commission: ${ this.monthlyIncomeAfterCommission().toFixed(2) }</td>
            </tr>
          </tbody>
        </table>

        <table className='a-table'>
          <thead>
            <tr>
              <th>Other Monthly Expenses</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Monthly Personnel Cost: ${ this.monthlyServiceCollectionsAdminCost().toFixed(2) }</td>
            </tr>
            <tr>
              <td>Total Monthly Depreciation: ${ this.totalMonthlyDepreciation().toFixed(2) }</td>
            </tr>
            <tr>
              <td>interestOnRedec (Interest of Avg Investment?): ${ this.interestOnRedec().toFixed(2) }</td>
            </tr>
            <tr>
              <td>Contingency: ${this.contingency().toFixed(2) } </td>
            </tr>
            <tr className='a-tooltip'>
              <td>
                Total Other Monthly Costs: ${ this.totalOtherMonthlyCosts().toFixed(2) }
                <span className='a-tooltip tooltiptext'>
                  <ul>
                    <li>Monthly Personnel Cost: ${ this.monthlyServiceCollectionsAdminCost().toFixed(2) }</li>
                    <li>Total Monthly Depreciation: ${ this.totalMonthlyDepreciation().toFixed(2) }</li>
                    <li>interestOnRedec (Interest of Avg Investment?): ${ this.interestOnRedec().toFixed(2) }</li>
                    <li>Contingency: ${this.contingency().toFixed(2) }</li>
                  </ul>
                </span>
              </td>
            </tr>
            <tr>
              <td className='box'>Monthly Net Income For Location: ${ this.monthlyNetIncomeForLocation().toFixed(2) }</td>
            </tr>
            <tr>
            </tr>
          </tbody>
        </table>

        <h3></h3>
        <table className='a-table'>
          <thead>
            <tr>
              <th>Cash Flow Over Contract</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Gross Collections Over Contract: ${this.grossOverContract().toFixed(2) }</td>
            </tr>
            <tr>
              <td>Rent Paid to Location Over Contract: ${this.rentOverContract().toFixed(2) }</td>
            </tr>
            <tr>
              <td>Rent + Bonus: ${ this.totalPaidOutToCustomerOverContract().toFixed(2) }</td>
            </tr>
            <tr>
              <td>Net Revenue Over Contract: ${this.netRevenueOverContract().toFixed(2) }</td>
            </tr>
            <tr>
              <td>Net Revenue - All Contract Costs: ${this.netRevenueOverContractMinusContractCosts().toFixed(2) }</td>
            </tr>
            <tr>
              <td className='box'>Net Revenue - All Costs (Profit): ${ this.netRevenueOverContractMinusContractAndInternalCosts().toFixed(2) }</td>
            </tr>
            <tr>
              <td></td>
            </tr>
            <tr>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div>
  
  
      </div>

      <div>


      </div>

    </div>
  	)
  }

})