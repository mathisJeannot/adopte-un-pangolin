const Pangolin = require('../models/Pangolin');
const bcrypt = require('bcrypt');

exports.createPangolin = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const pangolin  = new Pangolin({
                age: req.body.age,
                famille: req.body.famille,
                nourriture: req.body.nourriture,
                pseudo: req.body.pseudo,
                race: req.body.race,
                password: hash
            });
            pangolin.save()
                .then(() => res.status(201).json({message: 'utilisateur créé'}))
                .catch(error => res.status(400).json(error));
        })
        .catch(error => res.status(500).json(error));
};


exports.login = (req, res, next) => {
    Pangolin.findOne({ pseudo: req.body.pseudo})
        .then(user => {
            if(!user){
                return res.status(401).json({error: 'pangolin pas trouvé'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if(!valid){
                        return res.status(401).json({error: 'mot de passe incorrecte'})
                    }
                    res.status(200).json({
                        pseudoU: user.pseudo,
                        amisU: user.amis
                    })

                })
                .catch(error => res.status(500).json(error));
        })
        .catch(error => res.status(500).json(error));
};


exports.getOnePangolin = (req, res, next) => {
    Pangolin.findOne({pseudo: req.params.pseudo})
        .then(Pangolin => res.status(200).json(Pangolin))
        .catch(error => res.status(404).json(error));
};

exports.deletePangolin = (req, res, next) => {
    Pangolin.deleteOne({pseudo: req.params.pseudo})
        .then(() => res.status(200).json({message: 'deleted'}))
        .catch(error => res.status(400).json(error));
};

exports.modifyPangolin = (req, res, next) => {
    Pangolin.updateOne({ pseudo: req.params.pseudo }, { ...req.body, pseudo: req.params.pseudo })
        .then(() =>
        res.status(200).json({message: 'modification effectuée'}))
        .catch(error => res.status(400).json(error));
};

exports.getAllPangolins = (req, res, next) => {
    Pangolin.find()
        .then(pangolins => res.status(200).json(pangolins))
        .catch(error => res.status(400).json(error));
};
