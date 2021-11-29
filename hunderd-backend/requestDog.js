const request = require('request');
const Breed = require('./models/Breed');
const Dog = require('./models/Dog');

const createBreed = function(title) {
    const breed = new Breed({
        title
    });
    return breed.save();
};

const createDog = function(breed, image, title) {
    const dog = new Dog({
        breed,
        image,
        title
    });
    return dog.save();
};

module.exports = async () => {
    try {
        const count = await Breed.countDocuments();
        if (count < 100) {
            for(let i = 0; i < 2; i++) {
                request(process.env.DOG_API_URL, {json: true}, (err, res, body) => {
                    if (err) {
                        return console.log(err);
                    }
                    //console.log(body);
                    for (let i = 0; i < body.message.length; i++) {
                        let title = body.message[i].replace(/^.*breeds\//g, '').replace(/\/.*/g, '')
                        let titleTwo = body.message[i].replace(/^.*breeds\/.*\//g, '').replace(/\..*/g, '')

                        createBreed(title)
                        .then(breed => {
                            console.log("> Created new Breed\n", breed);
                            const breedId = breed._id.toString();
                            return createDog(breedId, body.message[i], titleTwo);
                        })
                        .then(dog => {
                            console.log("> Created new Dog\n", dog);
                        })
                        .catch(err => console.log(err));
                    }
                });
            }
        }
        return '100'
    } catch (e) {
        console.log(e)
    }
}
