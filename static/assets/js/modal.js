const addModal = (id)=>{
	let el = `
		<div id='${id}' class="modal fade" role="dialog" style="z-index: 9;">
		  <div class="modal-dialog">

			<!-- Modal content-->
			<div class="modal-content">
			  <div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" style="position:absolute;right:2%;display:;" onclick="document.getElementById('exploreProduct').classList.remove('show');document.getElementById('${id}').style.display=''">&times;</button>
				<h4 class="modal-title">Modal ${id}</h4>
			  </div>
			  <div class="modal-body" id="${id}-content">
				<p>Some text in the modal.</p>
			  </div>
			  <div class="modal-footer">
			  	<button type="button" data-target="modal" data-toggle="#${id}" style="display:none;" id="${id}-show">
				<button type="button" class="btn btn-default" data-dismiss="modal" onclick="document.getElementById('exploreProduct').classList.remove('show');document.getElementById('${id}').style.display=''">Close</button>
			  </div>
			</div>

		  </div>
		</div>
	`
	return el
}

