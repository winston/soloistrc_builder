# soloistrc builder

Do you use [soloist](https://github.com/mkocher/soloist)?

This simple app will help you build your *soloistrc* file easily from a (GitHub) directory of recipes.

Typically, this is our workflow for setting up our developer and ci machines:

		> mkdir cookbooks && cd cookbooks
		> git clone https://github.com/newcontext/pivotal_workstation

		# Build a soloistrc file by choosing from recipes in ~/cookbooks/pivotal_workstation/recipes

		> gem install soloist
		> soloist

Build your soloistrc now at [http://soloistrc-builder.herokuapp.com](http://soloistrc-builder.herokuapp.com).
