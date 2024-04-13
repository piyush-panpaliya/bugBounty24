const { Router } = require('express');
const dashboardController = Router();
const request = require('../models/request');
const secretary = require('../models/secretary');
const clubfa = require('../models/clubfa');
const societyfa = require('../models/societyfa');
const chairsap = require('../models/chairsap');
const deanstudents = require('../models/deanstudents');
const moment = require('moment');

dashboardController.get('/:usertype/dashboard', async (req, res) => {
  if (req.isAuthenticated()) {
    usertype = req.params.usertype;
    if (usertype === 'club') {
      req_results = await request.find({ email: req.user.email });
      res.render('dashboard', { requests: req_results });
    }
    if (usertype === 'Clubfa') {
      results = await clubfa.findOne({ email: req.user.email });
      req_results = await request.find({
        club_name: results.club,
        secretary_status: true,
        club_fa_status: null,
      });
      res.render('dashboard_clubfa', { requests: req_results });
    }
    if (usertype === 'Secretary') {
      results = await secretary.findOne({ email: req.user.email });
      req_results = await request.find({
        society: results.society,
        secretary_status: null,
      });
      res.render('dashboard_sec', { requests: req_results });
    }
    if (usertype === 'Societyfa') {
      results = await societyfa.findOne({ email: req.user.email });
      req_results = await request.find({
        society: results.society,
        secretary_status: true,
        club_fa_status: true,
        society_fa_status: null,
      });
      res.render('dashboard_socfa', { requests: req_results });
    }
    if (usertype === 'Chairsap') {
      results = await chairsap.findOne({ email: req.user.email });
      req_results = await request.find({
        secretary_status: true,
        club_fa_status: true,
        society_fa_status: true,
        chairsap_status: null,
      });
      res.render('dashboard_chairsap', { requests: req_results });
    }
    if (usertype === 'Deanstudents') {
      results = await deanstudents.findOne({ email: req.user.email });
      req_results = await request.find({ email: req.user.email });
      res.render('dashboard_dean', { requests: req_results });
    }
  } else {
    res.redirect('/');
  }
});

dashboardController.post('/:type/request', async (req, res) => {
  body = req.body;
  found = await request.findOne({ _id: body.id });
  res.render('desc_request', {
    type: req.params.type,
    request: found,
    date: moment(found.time).format('D/MM/YYYY'),
    time: moment(found.time).format('hh:mm A'),
  });
});

dashboardController.post('/approval', async (req, res) => {
  body = req.body;
  if (body.type === 'secretary') {
    if (body.Yes) {
      found = await request.findOneAndUpdate(
        { _id: body.id },
        { secretary_status: true }
      );
    } else {
      found = await request.findOneAndUpdate(
        { _id: body.id },
        { secretary_status: false }
      );
    }
  }
  if (body.type === 'club_fa') {
    if (body.Yes) {
      found = await request.findOneAndUpdate(
        { _id: body.id },
        { club_fa_status: true }
      );
    } else {
      found = await request.findOneAndUpdate(
        { _id: body.id },
        { club_fa_status: false }
      );
    }
  }
  if (body.type === 'society_fa') {
    if (body.Yes) {
      found = await request.findOneAndUpdate(
        { _id: body.id },
        { society_fa_status: true }
      );
    } else {
      found = await request.findOneAndUpdate(
        { _id: body.id },
        { society_fa_status: false }
      );
    }
  }
  if (body.type === 'chairsap') {
    if (body.Yes) {
      found = await request.findOneAndUpdate(
        { _id: body.id },
        { chairsap_status: true }
      );
    } else {
      found = await request.findOneAndUpdate(
        { _id: body.id },
        { chairsap_status: false }
      );
    }
  }
  if (body.type === 'deanstudents') {
    if (body.Yes) {
      found = await request.findOneAndUpdate(
        { _id: body.id },
        { deanstudents_status: true }
      );
    } else {
      found = await request.findOneAndUpdate(
        { _id: body.id },
        { deanstudents_status: false }
      );
    }
  }
  res.redirect('/');
});
module.exports = dashboardController;
