$(function() {

	function github_api_url() {
		var url  = $("#recipes").data("url");
		var user = url.split(/[\/]+/)[2];
		var repo = url.split(/[\/]+/)[3];
		return "https://api.github.com/repos/" + user + "/" + repo + "/contents/recipes";
	}

	$.ajax({
	  url: github_api_url(),
		success: function (data) {
			$("#config").html("Recipes successfully retrieved from: " + github_api_url());

			var $ul   = $("#recipes ul");
			$.each(data, function(index, elem) {
					$ul.append(
						"<li class='recipe'>" +
							"<label><input type='checkbox' value='"+ elem.name +"'>" + elem.name + "</label>"	+
						"</li>"
					);
			});
		},
		error: function(jqXHR, textStatus, errorThrown) {
			$("#config").html("Hmm.. Failed to retrieved receipes from: " + github_api_url());
		}
	})

	$(".recipe").live("click", function() {
		var paths   = ["cookbook_paths:", "- workspace"]
		var recipes = $.map($(".recipe input:checked"), function(elem, index) {
			return "- pivotal_workstation::" + $(elem).val().replace(".rb", "");
		});

		$("textarea").val(
			paths.join("\n") +
			"\n\n"					 +
			"recipes:\n" 		 +
			recipes.join("\n")
		);
	})

});
