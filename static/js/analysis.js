function analysisDashboard(){
    return `
    <div class="content-wrapper">
            <div class="content">

			<div class="row">
				<div class="col-md-12">
					
                          <!-- User activity statistics -->
                          <div class="card card-default" id="user-activity">
                            <div class="row no-gutters">
                              <div class="col-xl-8">
                                <div class="border-right">
                                  <div class="card-header justify-content-between py-5">
                                    <h2>User Activity</h2>
                                    <div class="date-range-report ">
                                      <span>Mar 10, 2024 - Mar 10, 2024</span>
                                    </div>
                                  </div>
                                  <ul class="nav nav-tabs nav-style-border justify-content-between justify-content-xl-start border-bottom" role="tablist">
                                    <li class="nav-item">
                                      <a class="nav-link active pb-md-0" data-toggle="tab" href="#user" role="tab" aria-controls="" aria-selected="true">
                                        <span class="type-name">User</span>
                                        <h4 class="d-inline-block mr-2 mb-3">5248</h4>
                                        <span class="text-success ">5%
                                          <i class="fas fa-arrow-up-bold"></i>
                                        </span>
                                      </a>
                                    </li>
                                    <li class="nav-item">
                                      <a class="nav-link pb-md-0" data-toggle="tab" href="#session" role="tab" aria-controls="" aria-selected="false">
                                        <span class="type-name">Sessions</span>
                                        <h4 class="d-inline-block mr-2 mb-3">638</h4>
                                        <span class="text-success ">20%
                                          <i class="fas fa-arrow-up-bold"></i>
                                        </span>
                                      </a>
                                    </li>
                                    <li class="nav-item">
                                      <a class="nav-link pb-md-0" data-toggle="tab" href="#bounce" role="tab" aria-controls="" aria-selected="false">
                                        <span class="type-name">Bounce Rate</span>
                                        <h4 class="d-inline-block mr-2 mb-3">36.9%</h4>
                                        <span class="text-danger ">7%
                                          <i class="fas fa-arrow-down-bold"></i>
                                        </span>
                                      </a>
                                    </li>
                                    <li class="nav-item">
                                      <a class="nav-link pb-md-0" data-toggle="tab" href="#session-duration" role="tab" aria-controls="" aria-selected="false">
                                        <span class="type-name">Session Duration</span>
                                        <h4 class="d-inline-block mr-2 mb-3">4m 49s</h4>
                                        <span class="text-success ">15%
                                          <i class="fas fa-arrow-up-bold"></i>
                                        </span>
                                      </a>
                                    </li>
                                  </ul>
                                  <div class="card-body">
                                    <div class="tab-content" id="myTabContent">
                                      <div class="tab-pane fade show active" id="user" role="tabpanel" aria-labelledby="home-tab"><div class="chartjs-size-monitor" style="position: absolute; inset: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;"><div class="chartjs-size-monitor-expand" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div></div><div class="chartjs-size-monitor-shrink" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:200%;height:200%;left:0; top:0"></div></div></div>
                                          <canvas id="activity" class="chartjs chartjs-render-monitor" width="600" height="280" style="display: block; width: 600px; height: 280px;"></canvas>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="card-footer d-flex flex-wrap bg-white border-top">
                                    <a href="#" class="text-uppercase py-3">Audience Overview</a>
                                  </div>
                                </div>
                              </div>
                              <div class="col-xl-4">
                                <div>
                                  <div class="card-header pt-5 flex-column align-items-start">
                                    <h4 class="text-dark mb-4">Current Users</h4>
                                    <div class="mb-3 current-users-content">
                                      <p class="my-2">Ave Page views per minute</p>
                                      <h4>09</h4>
                                    </div>
                                  </div>
                                  <div class="border-bottom"></div>
                                  <div class="card-body"><div class="chartjs-size-monitor" style="position: absolute; inset: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;"><div class="chartjs-size-monitor-expand" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div></div><div class="chartjs-size-monitor-shrink" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:200%;height:200%;left:0; top:0"></div></div></div>
                                    <canvas id="currentUser" class="chartjs chartjs-render-monitor" width="270" height="283" style="display: block; width: 270px; height: 283px;"></canvas>
                                  </div>
                                  <div class="card-footer d-flex flex-wrap bg-white border-top">
                                    <a href="#" class="text-uppercase py-3">Audience Overview</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

				</div>
			</div>

			<div class="row">
				<div class="col-xl-6 col-12">
					                        
                          <!-- User Acquisition Statistics -->
                          <div class="card card-default" id="user-acquisition">
                            <div class="card-header justify-content-between pb-5">
                              <h2>User Acquisition</h2>
                            </div>

                            <ul class="nav nav-tabs nav-style-border justify-content-between justify-content-lg-start border-bottom" role="tablist">
                              <li class="nav-item">
                                <a class="nav-link active" data-toggle="tab" href="#traffic-channel" role="tab" aria-controls="" aria-selected="true">Traffic Channel</a>
                              </li>
                              <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" href="#source-medium" role="tab" aria-controls="" aria-selected="false">Source / Medium </a>
                              </li>
                              <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" href="#referrals" role="tab" aria-controls="" aria-selected="false">Referrals</a>
                              </li>
                            </ul>
                            <div class="tab-content p-3 p-lg-5" id="myTabContent">
                              <div class="tab-pane fade show active pb-4" id="source-medium" role="tabpanel" aria-labelledby="profile-tab">
                                <div class="mb-5" style=" height:32vh"><div class="chartjs-size-monitor" style="position: absolute; inset: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;"><div class="chartjs-size-monitor-expand" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div></div><div class="chartjs-size-monitor-shrink" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:200%;height:200%;left:0; top:0"></div></div></div>
                                  <canvas id="acquisition" class="chartjs2 chartjs-render-monitor" width="384" height="133" style="display: block; width: 384px; height: 133px;"></canvas>
                                  <div id="acqLegend" class="customLegend mb-2"><ul class="1-legend"><li><span style="background-color:rgb(76, 132, 255)"></span>Referral</li><li><span style="background-color:rgb(254, 196, 0)"></span>Direct</li><li><span style="background-color:rgb(41, 204, 151)"></span>Social</li></ul></div>
                                </div>
                              </div>
                            </div>
                            <div class="card-footer d-flex flex-wrap bg-white">
                              <a href="#" class="text-uppercase py-3">Audience Overview</a>
                            </div>
                          </div>

				</div>

				<div class="col-xl-6 col-12">
					
                          <!-- World Chart -->

                          <div class="card card-default" id="analytics-country">
                            <div class="card-header justify-content-between">
                              <h2>Sessions by Country</h2>
                              <div class="date-range-report ">
                                <span>Mar 11, 2024 - Mar 11, 2024</span>
                              </div>
                            </div>
                            <div class="card-body vector-map-world-2">
                              <div id="analytic-world" style="height: 100%; width: 100%;"></div>
                            </div>
                            <div class="border-top">
                              <div class="row no-gutters">
                                <div class="col-lg-6">
                                  <div class="world-data-chart border-bottom py-4"><div class="chartjs-size-monitor" style="position: absolute; inset: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;"><div class="chartjs-size-monitor-expand" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div></div><div class="chartjs-size-monitor-shrink" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:200%;height:200%;left:0; top:0"></div></div></div>
                                    <canvas id="hbar1" class="chartjs chartjs-render-monitor" width="179" height="150" style="display: block; width: 179px; height: 150px;"></canvas>
                                  </div>
                                </div>
                                <div class="col-lg-6">
                                  <div class="world-data-chart py-4 "><div class="chartjs-size-monitor" style="position: absolute; inset: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;"><div class="chartjs-size-monitor-expand" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div></div><div class="chartjs-size-monitor-shrink" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:200%;height:200%;left:0; top:0"></div></div></div>
                                    <canvas id="hbar2" class="chartjs chartjs-render-monitor" width="180" height="150" style="display: block; width: 180px; height: 150px;"></canvas>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="card-footer d-flex flex-wrap bg-white">
                              <a href="#" class="text-uppercase py-3">Audience Overview</a>
                            </div>
                          </div>

				</div>
			</div>

			<div class="row">
				<div class=" col-xl-4 ">
					<!-- Sessions By device Chart -->
					<div class="card card-default" id="analytics-device" analytics-data-height="">
						<div class="card-header justify-content-between">
							<h2>Sessions by Device</h2>
						</div>

						<div class="card-body">
							<div class="pb-5"><div class="chartjs-size-monitor" style="position: absolute; inset: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;"><div class="chartjs-size-monitor-expand" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div></div><div class="chartjs-size-monitor-shrink" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:200%;height:200%;left:0; top:0"></div></div></div>
								<canvas id="deviceChart" width="249" height="230" style="display: block; width: 249px; height: 230px;" class="chartjs-render-monitor"></canvas>
							</div>

							<div class="row no-gutters justify-content-center">
								<div class="col-4 col-lg-3">
									<div class="card card-icon-info text-center border-0">
										<i class="fa-solid fa-desktop"></i>
										<p class="pt-3 pb-1">Desktop</p>
										<h4 class="text-dark pb-1">60.0%</h4>
										<span class="text-danger">1.5% <i class="fas fa-arrow-down-bold"></i></span>
									</div>
								</div>

								<div class="col-4 col-lg-3">
									<div class="card card-icon-info text-center border-0">
									<i class="fa-solid fa-tablet"></i>	
										<p class="pt-3 pb-1">Tablet</p>
										<h4 class="text-dark pb-1">15.0%</h4>
										<span class="text-success">1.5% <i class="fas fa-arrow-up-bold"></i></span>
									</div>
								</div>

								<div class="col-4 col-lg-3">
									<div class="card card-icon-info text-center border-0">
									<i class="fa-solid fa-mobile"></i>
										<p class="pt-3 pb-1">Mobile</p>
										<h4 class="text-dark pb-1">25.0%</h4>
										<span class="text-success">1.5% <i class="fas fa-arrow-up-bold"></i></span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class=" col-xl-4 ">
					<!-- Page Views  -->
					<div class="card card-default table-borderless" id="page-views">
						<div class="card-header justify-content-between">
							<h2>Page Views</h2>

							<div class="date-range-report ">
								<span>Mar 11, 2024 - Mar 11, 2024</span>
							</div>
						</div>

						<div class="card-body py-0" data-simplebar="" style="height: 437px;">
							<table class="table page-view-table ">
								<thead>
									<tr>
										<th>Page</th>
										<th>Page Views</th>
										
									</tr>
								</thead>

								<tbody>
									<tr>
										<td class="text-primary"><a class="link" href="analytics.html">/analytics.html</a></td>
										<td>521</td>
										
									</tr>

									<tr>
										<td class="text-primary"><a class="link" href="email-inbox.html">/email-inbox.html</a></td>
										<td>356</td>
										
									</tr>

									<tr>
										<td class="text-primary"><a class="link" href="email-compose.html">/email-compose.html</a></td>
										<td>254</td>
										
									</tr>

									<tr>
										<td class="text-primary"><a class="link" href="charts-chartjs.html">/charts-chartjs.html</a></td>
										<td>126</td>
										
									</tr>

									<tr>
										<td class="text-primary"><a class="link" href="profile.html">/profile.html</a></td>
										<td>50</td>
										
									</tr>

									<tr>
										<td class="text-primary"><a class="link" href="general-widgets.html">/general-widgets.html</a></td>
										<td>50</td>
										
									</tr>

									<tr>
										<td class="text-primary"><a class="link" href="card.html">/card.html</a></td>
										<td>590</td>
										
									</tr>

									<tr>
										<td class="text-primary"><a class="link" href="email-inbox.html">/email-inbox.html</a></td>
										<td>29</td>
										
									</tr>
								</tbody>
							</table>
						</div>

						<div class="card-footer bg-white py-4">
							<a href="#" class="text-uppercase">Audience Overview</a>
						</div>
					</div>
				</div>

				<div class=" col-xl-4 ">
					<!-- Notification Table -->
					<div class="card card-default">
						<div class="card-header justify-content-between">
							<h2>Latest Notifications</h2>

							<div>
								<button class="text-black-50 mr-2 font-size-20"><i class="fas fa-cached"></i></button>

								<div class="dropdown show d-inline-block widget-dropdown">
									<a class="dropdown-toggle icon-burger-mini" href="#" role="button" id="dropdown-notification" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static"></a>
									<ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown-notification">
										<li class="dropdown-item"><a href="#">Action</a></li>
										<li class="dropdown-item"><a href="#">Another action</a></li>
										<li class="dropdown-item"><a href="#">Something else here</a></li>
									</ul>
								</div>
							</div>
						</div>

						<div class="card-body py-4" data-simplebar="" style="height: 475px;">
							<div class="media pb-4 align-items-center justify-content-between">
								<div class="d-flex rounded-circle align-items-center justify-content-center mr-3 media-icon iconbox-45 bg-primary text-white">
									<i class="fas fa-cart-outline font-size-20"></i>
								</div>

								<div class="media-body pr-3 ">
									<a class="mt-0 mb-1 font-size-15 text-dark" href="#">New Order</a>
									<p>Selena has placed an new order</p>
								</div>
								<span class=" font-size-12 d-inline-block"><i class="fas fa-clock-outline"></i> 10 AM</span>
							</div>

							<div class="media py-3 align-items-center justify-content-between">
								<div class="d-flex rounded-circle align-items-center justify-content-center mr-3 media-icon iconbox-45 bg-success text-white">
									<i class="fas fa-email-outline font-size-20"></i>
								</div>

								<div class="media-body pr-3">
									<a class="mt-0 mb-1 font-size-15 text-dark" href="#">New Enquiry</a>
									<p>Phileine has placed an new order</p>
								</div>

								<span class=" font-size-12 d-inline-block"><i class="fas fa-clock-outline"></i> 9 AM</span>
							</div>

						</div>

						<div class="mt-3"></div>
					</div>
				</div>
			</div>





      </div> <!-- End Content -->
    </div>`
	

}
const chartFunction = (id,labels) =>{
	console.log("in")
	var xValues = labels;
	var yValues = [60, 15, 25];
	var barColors = ["#FF7474", "#23274E","#28282B"];

	new Chart(id, {
	  type: "pie",
	  data: {
		labels: xValues,
		datasets: [{
		  backgroundColor: barColors,
		  data: yValues
		}]
	  },
	  options: {
		title: {
		  display: true,
		  text: "Demo"
		}
	  }
	});
	return true
}

const barChart= (id,labels) =>{
	console.log("in")
	var xValues = ["Jan","Feb","March","April","May","June"];
	var yValues = [60, 15, 25,34,65,56];
	var barColors = "#28282B";

	new Chart(id, {
	  type: "bar",
	  data: {
		labels: xValues,
		datasets: [{
		  backgroundColor: barColors,
		  data: yValues
		}]
	  },
	  options: {
		title: {
		  display: true,
		  text: "Total Visits"
		}
	  }
	});
	return true
}

const lineChart = (id,labels) =>{
	console.log("in")
	const xValues = labels ? labels :[1,2,3,4,5,6,7,8,9,10];

	new Chart(id, {
	type: "line",
		data: {
			labels: xValues,
			datasets: [{
			data: [860,1140,1060,1060,1070,1110,1330,2210,7830,2478],
			borderColor: "red",
			fill: false,
			title:"Direct"
			},{
			data: [1600,1700,1700,1900,2000,2700,4000,5000,6000,7000],
			borderColor: "green",
			fill: false,
			title:"Refferal"
			},{
			data: [1600,1700,1700,1900,200,2700,400,500,6000,700],
			borderColor: "green",
			fill: false,
			title:"Social"
			}]
		},
		options: {
			legend: {display: false}
		}
	});
	return true
}

const roundedChart = (id,labels) =>{
	console.log("in")
	const xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
	const yValues = [55, 49, 44, 24, 15];
	const barColors = ["red", "green","blue","orange","brown"];
	new Chart(id, {
		type: "doughnut",
		data: {
		  labels: xValues,
		  datasets: [{
			backgroundColor: barColors,
			data: yValues
		  }]
		},
		options: {
		  title: {
			display: true,
			text: "World Wide Wine Production"
		  }
		}
	  });
	return true
}