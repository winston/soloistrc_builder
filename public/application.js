$(function() {

	function github_user() {
		return $("#recipes").data("url").split(/[\/]+/)[2];
	}

	function github_repo() {
		return $("#recipes").data("url").split(/[\/]+/)[3];
	}

	function github_api_url() {
		return "https://api.github.com/repos/" + github_user() + "/" + github_repo() + "/contents/recipes";
	}

	$.ajax({
	  url: github_api_url(),
	  dataType: 'jsonp',
		success: function (response) {
			$("#config").html("Recipes successfully retrieved from: " + github_api_url());

			var $ul = $("#recipes ul");
			$.each(response.data, function(index, elem) {
					$ul.append(
						"<li class='recipe'>" +
							"<label><input type='checkbox' value='"+ elem.name +"'>" + elem.name + "</label>"	+
							"<a class='source' href='"+ elem._links.self +"'>View</a>" +
						"</li>"
					);
			});
		},
		error: function(jqXHR, textStatus, errorThrown) {
			$("#config").html("Hmm.. Failed to retrieved recipes from: " + github_api_url());
		}
	})

	$(".recipe label").live("click", function() {
		var paths   = ["cookbook_paths:", "- cookbooks"]
		var recipes = $.map($(".recipe input:checked"), function(elem, index) {
			return "- " + github_repo() + "::" + $(elem).val().replace(".rb", "");
		});

		$("textarea").val(
			paths.join("\n") +
			"\n\n"					 +
			"recipes:\n" 		 +
			recipes.join("\n")
		);
	})

	$(".source").live("click", function(e) {
		var url = $(this).attr("href");
		$.ajax({
		  url: url,
		  dataType: 'jsonp',
			success: function (response) {
				$("#recipes,#soloistrc").fadeOut("fast")

				$("#source div").html(response.data.name);
				$("#source pre").html(window.atob(response.data.content.replace(/\n/g, "")));
				$("#source").show();
			},
			error: function(jqXHR, textStatus, errorThrown) {
				$("#config").html("Hmm.. Failed to retrieve source from: " + url);
			}
		})

		e.preventDefault();
	})

	$("#source .close").live("click", function(e) {
		$("#recipes,#soloistrc").fadeIn("fast");
		$("#source").hide();

		e.preventDefault();
	})

});
