const { Router } = require('express');
const Request = require('../models/request');
const Club = require('../models/club');
const addFormRoute = Router();
var upload = require('../config/storage');
const secretary = require('../models/secretary');

addFormRoute.get('/addRequest', async (req, res) => {
  results = await Club.findOne({ email: req.user.email });
  res.render('requestform', { results });
});

addFormRoute.get('/addRequestSec', async (req, res) => {
  results = await secretary.findOne({ email: req.user.email });
  res.render('requestformsec', { results });
});

addFormRoute.post(
  '/addRequestSec',
  upload.single('attachments'),
  (req, res) => {
    data = req.body;
    console.log(data);
    if (!req.body.money) {
      newRequest = new Request({
        time: Date.now(),
        title: data.title,
        description: data.request_description,
        email: req.user.email,
        money_req: null,
        secretary_status: true,
        club_fa_status: null,
        society_fa_status: null,
        chairsap_status: null,
        society: data.society,
        club_name: data.club_name,
        upload: req.file.filename != undefined ? req.file.filename : '',
        uploadType: req.file.mimetype != undefined ? req.file.mimetype : '',
      });
      newRequest.save();
    } else {
      newRequest = new Request({
        time: Date.now(),
        title: data.title,
        description: data.request_description,
        email: req.user.email,
        money_req: data.money,
        secretary_status: true,
        club_fa_status: null,
        society_fa_status: null,
        chairsap_status: null,
        society: data.society,
        club_name: data.club_name,
        upload: req.file.filename != undefined ? req.file.filename : '',
        uploadType: req.file.mimetype != undefined ? req.file.mimetype : '',
      });
      newRequest.save();
    }
    res.redirect('/');
  }
);

addFormRoute.post(
  '/addRequest',
  upload.array('attachments', 10),
  (req, res) => {
    data = req.body;
    console.log(data);
    if (!req.body.money) {
      newRequest = new Request({
        time: Date.now(),
        title: data.title,
        description: data.request_description,
        email: req.user.email,
        money_req: null,
        secretary_status: null,
        club_fa_status: null,
        society_fa_status: null,
        chairsap_status: null,
        society: data.society,
        club_name: data.club_name,
      });
      newRequest.save();
    } else {
      newRequest = new Request({
        time: Date.now(),
        title: data.title,
        description: data.request_description,
        email: req.user.email,
        money_req: data.money,
        secretary_status: null,
        club_fa_status: null,
        society_fa_status: null,
        chairsap_status: null,
        society: data.society,
        club_name: data.club_name,
      });
      newRequest.save();
    }
    res.redirect('/');
  }
);
module.exports = addFormRoute;
