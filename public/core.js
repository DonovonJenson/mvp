angular.module('app')

.component('main', {
	
	controller: function($http, $interval) {
	  this.rhyme = 'Blank'
	  this.speed = 4000;
	  this.go;
	  this.going = true;

	  this.getRhymes = () => {
	  	$http.get('/rhymes', {}).then((response) => {
	  		response.data[0].rhymeSet.unshift(response.data[0].core)
	  		this.rhyme = response.data[0].rhymeSet;
	  		console.log(this.rhyme)

  	 	})
      }

      this.$onInit = () => {
      	this.getRhymes();
        this.go = $interval(this.getRhymes, this.speed);
      };

      this.speedIncrease = () => {
      	$interval.cancel(this.go)
      	this.speed -= 1000;
      	this.go = $interval(this.getRhymes, this.speed);
      	console.log(this.go)
      }

      this.speedDecrease = () => {
      	$interval.cancel(this.go)
      	this.speed += 1000;
      	this.go = $interval(this.getRhymes, this.speed);
      	console.log(this.go)
      }

      this.remove = () => {
      	$http.post('/remove', {core: this.rhyme[0]}, { headers: { 'Content-Type': 'application/json' }}).then((response) =>{
      		console.log(response);
      	})
      }

      this.pause = () => {
      	console.log(this.going);
      	if (this.going){
      	  $interval.cancel(this.go);
      	} else {
      	  this.go = $interval(this.getRhymes, this.speed);
      	}
      	this.going = !this.going;
      }

    },


    templateUrl: './template.html' 

});