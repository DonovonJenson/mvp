angular.module('app')

.component('main', {
	
	controller: function($http) {
	  this.rhyme = 'Blank'
	  this.speed = 5000;

	  this.getRhymes = () => {
	  	$http.get('/rhymes', {}).then((response) => {
	  		response.data[0].rhymeSet.unshift(response.data[0].core)
	  		this.rhyme = response.data[0].rhymeSet;
	  		console.log(this.rhyme)
	  // 	if (response.data.length < 5){
	  // 		this.getRhymes();
	  // 	} else {
			// console.log(response.data)
	  // 		this.rhyme = response.data
	  // 	}
  	 	})
      }

      this.$onInit = () => {
      	this.getRhymes();
        //var continousRhymes = setInterval(this.getRhymes, this.speed);
      };

      this.speedIncrease = () => {
      	clearInterval(continousRhymes)
      	this.speed += 1000;
      	var continousRhymes = setInterval(this.getRhymes, this.speed);

      }

      this.speedDecrease = () => {
      	clearInterval(continousRhymes);
      	this.speed -= 1000;
      	console.log(this.speed)
      	var continousRhymes = setInterval(this.getRhymes, this.speed);
      }

    },


    templateUrl: './template.html' 

});