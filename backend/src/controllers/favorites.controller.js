const User = require('../models/user.model');

// Add a country to favorites
exports.addFavorite = async (req, res) => {
    try {
        const { countryCode } = req.body;

        if (!countryCode) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a country code'
            });
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Check if country is already in favorites
        if (user.favoriteCountries.includes(countryCode)) {
            return res.status(400).json({
                success: false,
                message: 'Country already in favorites'
            });
        }

        user.favoriteCountries.push(countryCode);
        await user.save();

        res.status(200).json({
            success: true,
            data: user.favoriteCountries
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// Remove a country from favorites
exports.removeFavorite = async (req, res) => {
    try {
        const { countryCode } = req.params;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        user.favoriteCountries = user.favoriteCountries.filter(code => code !== countryCode);
        await user.save();

        res.status(200).json({
            success: true,
            data: user.favoriteCountries
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// Get user's favorite countries
exports.getFavorites = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            data: user.favoriteCountries
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};
