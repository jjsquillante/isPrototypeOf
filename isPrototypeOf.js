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
	if (proto === undefined || proto === null) {
		throw new TypeError('first argument cannot be undefined or null');
	}
	var currentObj = Object.getPrototypeOf(obj);
	while (currentObj !== null) {
		if (proto === currentObj) {
			return true;
		}
		currentObj = Object.getPrototypeOf(currentObj);
	}
	return false;
}
