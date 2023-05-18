import {model, Schema} from "mongoose";

/// This is the schema for the movies collection
const MovieSchema = new Schema({
    title: String,
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