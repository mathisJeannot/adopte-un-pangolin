const express = require('express');
const router = express.Router();

const pangolinCtrl = require('../controllers/pangolin');

router.post('/signup', pangolinCtrl.createPangolin);
router.post('/login', pangolinCtrl.login);
router.get('/:pseudo', pangolinCtrl.getOnePangolin);
router.put('/:pseudo', pangolinCtrl.modifyPangolin);
router.delete('/:pseudo', pangolinCtrl.deletePangolin);
router.use('/', pangolinCtrl.getAllPangolins);

module.exports = router;
