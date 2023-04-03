const Joi= require('joi');

const joiProductSchema= Joi.object({
    name: Joi.string().required(),
    img: Joi.string().required(),
    price: Joi.number().min(0).required(),
    description: Joi.string().required()
});

const joiReviewSchema = Joi.object({
    rating: Joi.number().min(0).max(5),
    comment: Joi.string().required()
})

module.exports={
    joiProductSchema,
    joiReviewSchema
}