exports.Clothes = function(id, imgPath, name, season, lastTimeWorn, isHere, additionalInfo) {
	this.id = id;
	this.imgPath = imgPath;
	this.name = name;
	this.season = season;
	this.lastTimeWorn = lastTimeWorn;
	this.isHere = isHere;
	this.additionalInfo = additionalInfo;
	this.howManyTimesWorn = 0;
};