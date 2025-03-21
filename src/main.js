import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

import { marked } from 'marked';
import DOMPurify from 'dompurify';
import dateformat from 'date-format'
import download from 'downloadjs';
import Bowser from 'bowser';

const empires = [
    "Alarian Confederacy",
    "Confederacy of Velutarian Systems",
    "Imperial Union of Iryum",
    "Kingdom of the Bay",
    "Kressh Psi Lords",
    "Olyrian Mandate",
    "Order of the Toxic God",
    "The Celestial Conclave",
    "The Cruthian Research Facilities",
    "The Dominion of the Machine Mother",
    "The Niraveolan Ascendancy",
    "The Shraak explorator empire",
    "The shroomian Mycelia",
    "The Trade Republic of Sanctourus",
    "U'tai Fleet",
    "Uthra'zai",
]

const selectedEmpireKey = "selectedEmpire"

window.addEventListener("load", () => {
    const browser = Bowser.getParser(window.navigator.userAgent);
    document.getElementById("browser-warning").hidden = browser.getBrowserName(true) == "chrome"

    Array.from(document.getElementsByTagName("input"))
        .concat(Array.from(document.getElementsByTagName("textarea")))
        .forEach(element => {
            if (localStorage.getItem(element.id) !== null) {
                element.value = localStorage.getItem(element.id)
            }

            element.addEventListener("keyup", (e) => {
                localStorage.setItem(element.id, e.target.value)
            })
            element.addEventListener("change", (e) => {
                localStorage.setItem(element.id, e.target.value)
            })
        })

    const newsBody = document.getElementById("news-body")
    const newsTitle = document.getElementById("news-title")
    const newsDate = document.getElementById("news-date")
    const newsEmpire = document.getElementById("news-empire")
    const newsExport = document.getElementById("news-export")

    const newsTitleView = document.getElementById("news-title-view")
    const newsBodyView = document.getElementById("news-body-view")
    const newsDateView = document.getElementById("news-date-view")
    const newsAuthor = document.getElementById("news-author")

    const selectedEmpire = localStorage.getItem(selectedEmpireKey)

    const newsEmpireData = document.createElement("datalist")
    document.body.appendChild(newsEmpireData)
    newsEmpireData.id = "news-empire-data"

    empires.forEach(empire => {
        const option = document.createElement("option")
        option.textContent = empire

        newsEmpireData.appendChild(option)
    })

    newsEmpire.value = selectedEmpire
    newsEmpire.addEventListener("change", (e) => {
        localStorage.setItem(selectedEmpireKey, e.target.value)
        newsAuthor.textContent = e.target.value
    })

    newsBody.addEventListener("keyup", (e) => {
        newsBodyView.innerHTML = DOMPurify.sanitize(marked(e.target.value));
    })

    newsTitle.addEventListener("keyup", (e) => {
        newsTitleView.textContent = e.target.value
    })

    newsDate.addEventListener("change", (e) => {
        newsDateView.textContent = dateformat("- dd-MM-yyyy", new Date(e.target.value))
    })

    newsExport.addEventListener("click", () => {
        toPng(document.getElementById("news"), {
            style: {
                border: "5px solid transparent"
            }
        }).then((dataUrl) => {
            download(dataUrl, "news.png", "image/png")
        }, (e) => {
            console.error(`Error exporting image: ${e}`)
            window.alert("There was an issue with exporting the image. Please tell chase")
        })
    })

    newsTitleView.textContent = newsTitle.value
    newsBodyView.innerHTML = DOMPurify.sanitize(marked(newsBody.value));
    newsDateView.textContent = dateformat("- dd-MM-yyyy", new Date(newsDate.value))
})