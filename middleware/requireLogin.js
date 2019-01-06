'use strict';

module.exports = (req, res, next) => {
  if(!req.user){
    return res.status(401).send('<h1>MUST BE LOGGED IN TO USE THIS APP!</h1>');
  }

  next();
};