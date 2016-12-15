var	home = require('../app/controllers/home'),
	  clothes = require('../app/controllers/clothes'),
    whatToWear = require('../app/controllers/whatToWear');

var multer = require('multer');
var upload = multer({dest: __dirname + '/../public/clothes_images/'});

module.exports = function(app) {

	app.get('/', home.index);

	app.get('/receivedrfid', function(req, res) {
    if(clothes.isRfidProper(req.query.id)) {
      if(!clothes.isRfidHere(req.query.id))
      	clothes.notificationToAddClothe(req.query.id);
      else
    	  clothes.changeStatus(req.query.id);
      
      res.redirect('/');
    }
    else
      res.render("pages/error", {msg: "RFID that is just read is not proper."}); 
	});


  app.get('/newClothes', clothes.newClothes);
  app.post('/newClothes', upload.single('displayImage'), clothes.addNewClothes);

  app.get('/clothes', clothes.listAllClothes);
  app.get('/clothe', clothes.findClothe);

  app.get('/what_to_wear', whatToWear.showList);

  app.get('/deleteClothe', clothes.deleteClothe);
  app.post('/deleteClothe', clothes.removeClothe);

  app.get('/editClothe', clothes.editClothe);
  app.post('/editClothe', clothes.updateClothe);
};