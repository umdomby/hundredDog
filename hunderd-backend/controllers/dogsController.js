const ApiError = require('../error/ApiError');
const Breed = require('../models/Breed');
const Dog = require('../models/Dog');


class DogsController {

    async getAll(req, res, next) {
        try {
        const breeds = await Dog.find().populate({
            path:"breed",
            select: '-_id'
        });

        res.json(breeds)
        }catch (e){
                return next(ApiError.internal(e.message))
        }
    }

    async searchTitle(req, res, next) {
        try {
            const title = req.params.title
            const searchTitle = await Dog.find({image: { "$regex": title}}).populate({
                path:"breed",
                select: '-_id'
            });
            console.log(searchTitle)
            res.json(searchTitle)
        }catch (e){
            return next(ApiError.internal(e.message))
        }
    }

    async selectBreed(req, res, next) {
        try {

            const breed = req.params.breed
            var result = []
            const searchBreed =  await Breed.find({title:breed})

            for(let i = 0; i < Object.keys(searchBreed).length; i++){
                const searchTitle = await Dog.findOne({breed: searchBreed[i]._id}).populate({
                    path:"breed",
                    select: '-_id'
                });
                result.push(searchTitle)
            }

            console.log(result)
            res.json(result)

        }catch (e){
            return next(ApiError.internal(e.message))
        }
    }
}

module.exports = new DogsController()
