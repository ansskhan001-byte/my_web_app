const Player = require("../models/playerModel");

exports.addPlayer = (req, res) => {

    const player = {

        ...req.body,

        image: req.file
            ? req.file.filename
            : null

    };

    Player.createPlayer(player, (err) => {

        if (err)
            return res.status(500).json(err);

        res.status(201).json({

            success: true,

            message: "Player Added Successfully",

            player

        });

    });

};

exports.getPlayers = (req, res) => {

    Player.getAllPlayers(req.query, (err, result) => {

        if (err)
            return res.status(500).json(err);

        res.status(200).json({

            success: true,

            total: result.length,

            players: result

        });

    });

};