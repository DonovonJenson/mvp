angular.module('app')

.component('main', {
	
	controller: function($http, $interval) {
	  this.rhyme = 'Blank'
	  this.speed = 4000;
	  this.go;
	  this.going = true;
	  this.status = 'Pause'

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
      	this.speed -= 500;
      	this.go = $interval(this.getRhymes, this.speed);
      	console.log(this.go)
      }

      this.speedDecrease = () => {
      	$interval.cancel(this.go)
      	this.speed += 500;
      	this.go = $interval(this.getRhymes, this.speed);
      	console.log(this.go)
      }

      this.remove = () => {
      	$http.post('/remove', {core: this.rhyme[0]}, { headers: { 'Content-Type': 'application/json' }}).then((response) =>{
      		console.log(response);
      	})
      	this.rhyme = ['DELETED','B','Y','E','!']

      }

      this.pause = () => {
      	console.log(this.going);
      	if (this.going){
      	  $interval.cancel(this.go);
      	  this.status = 'Play'
      	} else {
      	  this.go = $interval(this.getRhymes, this.speed);
      	  this.status = 'Pause'
      	}
      	this.going = !this.going;
      }

    },


    templateUrl: './template.html' 

});