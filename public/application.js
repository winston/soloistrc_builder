$(function() {

	$.ajax({
	  url: "https://api.github.com/repos/newcontext/pivotal_workstation/contents/recipes",
		success: function (data) {
			var $ul = $("#recipes ul");
			$.each(data, function(index, elem) {
					$ul.append(
						"<li class='recipe'>" +
							"<label><input type='checkbox' value='"+ elem.name +"'>" + elem.name + "</label>"	+
						"</li>"
					);
			});
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
