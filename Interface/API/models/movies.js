import {model, Schema} from "mongoose";

const MovieSchema = new Schema({
    title: Object,
    year: String,
    date: Date,
    originalTitle: String,
    realisator: Array(String),
    languages : Array(String),
    genders: Array(String),
    actors: Array(String),
    tags: Array(String),
    synopsis: String,
    time: String,
    picture: String,
    likePercentage: Number
})

export default model('Movie', MovieSchema)