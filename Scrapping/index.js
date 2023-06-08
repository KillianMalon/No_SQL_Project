import puppeteer from 'puppeteer';
import mongoose from "mongoose";
const uri = "mongodb+srv://admin:admin@clusternode.qh7tm6h.mongodb.net/tirexo?retryWrites=true&w=majority";
import Movie from "../Interface/API/models/movies.js";



/// Scraping Tirexo
(async () => {
    /// Connect to Mongo
    mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log('Mongo Initialized')
        })
        .catch((error) => {
            console.log('Mongo Failed: ', error)
        })
    /// Launch Puppeteer
    const browser = await puppeteer.launch({headless : false});
    /// Get the number of page
    const page = await browser.newPage();
    /// Set the timeout to 0
    await page.setDefaultNavigationTimeout(0);
    /// Go to the page
    await page.goto('https://www.tirexo.al/films')
    /// Get the number of page
    const numberOfPage = await page.evaluate(() => {
        let numberPage = parseInt(document.querySelector('#dle-content > div.pagi-nav.clearfix.ignore-select > span.navigation > a:nth-child(12)').textContent)
        return numberPage
    })
    /// Close the page
    await page.close()
    let compteur
    let compteur2
    /// Loop on the number of page
    try {
        for (compteur = 0; compteur <= numberOfPage; compteur++) {
            const page2 = await browser.newPage()
            await page2.setDefaultNavigationTimeout(0);
            await page2.goto('https://www.tirexo.al/films/page/'+compteur)
            /// Get the number of film per page
            const filmPage = await page2.evaluate(() => {
                let filmPerPage = []
                /// Get the film of the page
                let filmOfPage = document.querySelectorAll('#dle-content > div.mov.clearfix')
                for (let film of filmOfPage){
                    /// Get the title of the film
                    let originalTitle = film.querySelector('div.mov-i.img-box').getAttribute('data-original-title')
                    /// Get the link of the film
                    let link = film.querySelector('div.mov-i.img-box > a').href
                    /// Get the language of the film
                    let langue
                    /// Try to get the language of the film
                    try{
                        langue = (film.querySelector('span.langue').textContent).slice(2, -1)
                    }catch (err){
                        langue = ""
                    }
                    /// Push the film in the array
                    filmPerPage.push({
                        link: link,
                        originalTitle: originalTitle,
                        language: langue
                    })
                }
                return filmPerPage
            })
            await page2.close()
            compteur2 = 0
            /// Loop on the film of the page
            for(let film of filmPage) {
                /// Find if the film is already in the database
                const finded = await Movie.findOne({originalTitle: film['originalTitle']})
                /// If the film is not in the database
                if (!finded) {
                    let linkMovie = film['link']
                    const page3 = await browser.newPage();
                    await page3.setDefaultNavigationTimeout(0);
                    await page3.goto(linkMovie, {waitUntil: "domcontentloaded"})
                    const infosMovies = await page3.evaluate(() => {
                        /// Test if the film exist
                        let testExist = document.querySelector('#dle-content > article')
                        /// If the film exist
                        /// Get the informations of the film
                        if (testExist) {
                            let infos = []
                            let title = document.querySelector('#dle-content > article > div.cols-mov.clearfix.ignore-select > div > div:nth-child(1) > h1 > b').textContent.replaceAll('"', "'")
                            let year = document.querySelector('#dle-content > article > div.cols-mov.clearfix.ignore-select > div > div:nth-child(1) > h1 > span').textContent
                            let picture = document.querySelector('#dle-content > article > div.cols-mov.clearfix.ignore-select > div > div:nth-child(1) > img').src
                            let originalTitle = document.querySelector('#dle-content > article > div.cols-mov.clearfix.ignore-select > div > div:nth-child(1) > ul > li:nth-child(2) > div > span:nth-child(2) > span').textContent.replaceAll('"', "'")
                            let language = document.querySelector('#dle-content > article > div.cols-mov.clearfix.ignore-select > div > div:nth-child(1) > div > span.couleur-languesz').textContent
                            console.log(language)
                            let moreInfosLink = "Nothing"
                            let realisator = "Nothing"
                            let date = "Nothing"
                            let lisLi = document.querySelectorAll('#dle-content > article > div.cols-mov.clearfix.ignore-select > div > div:nth-child(1) > ul > li ')
                            /// Loop on the informations of the film
                            for (let element of lisLi) {
                                let strong
                                try {
                                    strong = element.textContent
                                } catch (e) {
                                    strong = "Nothing"
                                }
                                if (strong.includes('Au cinéma')) {
                                    date = element.querySelector('span:nth-child(2)').textContent
                                }
                                if (strong.includes('Réalisateur(s)')) {
                                    realisator = document.querySelector('#realisateur').textContent.replaceAll('"', "'")
                                }
                                if (strong.includes("Plus d'information sur tmdb")) {
                                    moreInfosLink = element.querySelector('a').href
                                }
                            }
                            /// Push the informations in the array
                            infos.push({
                                title: title,
                                year: year,
                                picture: picture,
                                originalTitle: originalTitle,
                                language: language,
                                realisator: realisator,
                                date: date,
                                moreInfosLink: moreInfosLink
                            })
                            return infos
                        }
                    })
                    /// If the info of the film and the film exist
                    if (infosMovies) {
                        /// Get the informations of the film
                        let title = infosMovies[0]['title']
                        let year = infosMovies[0]['year']
                        if (year.includes('(')) {
                            while (year.includes('(')) {
                                year = year.toString().replace('(', "");
                            }
                        }
                        if (year.includes(')')) {
                            while (year.includes(')')) {
                                year = year.toString().replace(')', "");
                            }
                        }
                        year = parseFloat(year)
                        /// Get the informations of the film
                        let date = infosMovies[0]['date']
                        let picture = infosMovies[0]['picture']
                        let originalTitle = infosMovies[0]['originalTitle']
                        let realisator = infosMovies[0]['realisator']
                        let language = (infosMovies[0]['language']).replace(" ", "")
                        let moreInfosLink = infosMovies[0]['moreInfosLink']
                        await page3.close()
                        const page4 = await browser.newPage();
                        await page4.setDefaultNavigationTimeout(0);
                        await page4.goto(moreInfosLink, {waitUntil: "domcontentloaded"})
                        const supplementaryInfosMovies = await page4.evaluate(() => {
                            /// Test if the film exist
                            let testExist = document.querySelector('#main > section > div.header.large.border.first > div > div')
                            if (testExist) {
                                let supplementaryInfos = []
                                let time
                                try {
                                    time = document.querySelector('span.runtime').textContent.trim()
                                } catch (e) {
                                    time = "Inconnu"
                                }
                                let likePercentage
                                try {
                                    likePercentage = document.querySelector('div.consensus.details > div > div').dataset.percent
                                }catch (e) {
                                    likePercentage = 0.0
                                }
                                let synopsis
                                try{
                                    synopsis = document.querySelector('div.header_info > div > p').innerText.replaceAll('"', "")
                                }catch (err){
                                    synopsis = ""
                                }
                                let listActors = document.querySelectorAll('#cast_scroller > ol > li.card')
                                let actors = []
                                if (listActors.length > 0) {
                                    for (let actor of listActors) {
                                        let actorName = actor.querySelector('p a').innerText.replaceAll('"', "'")
                                        actors.push(actorName)
                                    }
                                } else {
                                    actors = "Nothing"
                                }
                                let listGenders = document.querySelectorAll('span.genres > a')
                                let genders = []
                                if (listGenders.length > 0) {
                                    for (let gender of listGenders) {
                                        let genderName = gender.textContent
                                        genders.push(genderName)
                                    }
                                } else {
                                    genders = "Nothing"
                                }

                                let listTags = document.querySelectorAll('#media_v4 > div > div > div.grey_column > div > section > div:nth-child(1) > div > section.keywords.right_column > ul > li a')
                                let tags = []
                                if (listTags.length > 0) {
                                    for (let tag of listTags) {
                                        let tagsName = tag.textContent
                                        tags.push(tagsName)
                                    }
                                } else {
                                    tags = "Nothing"
                                }
                                supplementaryInfos.push({
                                    time: time,
                                    likePercentage: likePercentage,
                                    synopsis: synopsis,
                                    genders: genders,
                                    actors: actors,
                                    tags: tags,
                                })
                                return supplementaryInfos
                            }
                        })
                        await page4.close()
                        /// If the supplementary informations exist
                        if (supplementaryInfosMovies) {
                            let time = supplementaryInfosMovies[0]['time']
                            let likePercentage = supplementaryInfosMovies[0]['likePercentage']
                            let synopsis = supplementaryInfosMovies[0]['synopsis']
                            let genders = supplementaryInfosMovies[0]['genders']
                            let actors = supplementaryInfosMovies[0]['actors']
                            let tags = supplementaryInfosMovies[0]['tags']
                            /// Create the film in the database
                            try {
                                const movie = await Movie.create({
                                    title,
                                    year,
                                    date,
                                    originalTitle,
                                    realisator,
                                    languages: language,
                                    genders,
                                    actors,
                                    tags,
                                    synopsis,
                                    time,
                                    picture,
                                    likePercentage
                                })
                            }catch (e) {
                                console.log("Page : "+compteur)
                                console.log("Element : "+compteur2)
                                console.log(e)
                            }
                        }
                    }
                }else{
                    /// If the film exist
                    const findLanguage = finded.languages
                    let verify = 0
                    /// Verify if the language of the film exist in the database
                    for(var i= 0; i < findLanguage.length; i++){
                        if (findLanguage[i] === film['language']){
                            verify = 1
                        }
                    }
                    /// If the language of the film doesn't exist in the database
                    if(verify === 0){
                        /// Update the film with the new language
                        const updatedFilm = await Movie.findByIdAndUpdate(finded._id, {languages: [...finded.languages, film['language']]}, {new: true})
                    }else{
                        continue
                    }
                }
            compteur2++
            }
        }
        console.log('yes')
    }catch (e) {
        console.log("Page : "+compteur)
        console.log("Element : "+compteur2)
        console.log(e)

    }
    /// Close the browser
    await browser.close();
})
();