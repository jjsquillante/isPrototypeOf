var james = {
	name: 'james sq.',
	age: 27
};

var james2 = Object.create(james);
james2.favTeam = 'clemson tigers';

var james3 = Object.create(james2);
james3.favColor = 'orange';

var randomObject = {};

function isPrototypeOf(proto, obj) {
	var currentObj = obj;
	while (currentObj !== null) {
		if (proto === currentObj) {
			return true;
		}
		currentObj = Object.getPrototypeOf(currentObj);
	}
	return false;
}
