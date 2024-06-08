const searchForm = document.getElementById('searchForm')
const searchText = document.getElementById('searchText')
const imageBox = document.getElementById('imageBox')
const showMore = document.getElementById('showMore')
const searchBtn = document.getElementById('searchBtn')
const noResult = document.getElementById('noResult')
//https://api.unsplash.com/search/photos?page=1&query=tree&client_id=qcy3s2NNUBh4RBnPjtqNnrjoI5trCqjIG-hwReOBZqI&per_page=12

let page = 1
const accessKey = "qcy3s2NNUBh4RBnPjtqNnrjoI5trCqjIG-hwReOBZqI"

async function showImage() {
    let keyword = searchText.value
    let URL = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`
    let response = await fetch(URL)
    let imgData = await response.json()
    // console.log(imgData)

    if (keyword.length === 0 || /^\s*$/.test(keyword)) {
        // console.log("Hello")
        searchForm.classList.add('error')
        setTimeout(() => {
            searchForm.classList.remove('error')
        },800);
    }
    else {

        if (page === 1) {
            imageBox.innerHTML = ''
        }

        let results = imgData.results
        // console.log(results.length)
        if (results.length > 0) {

            imageBox.style.display = 'grid'
            noResult.style.display = 'none'


            Array.from(results).forEach(element => {
                let image = document.createElement('img')
                image.src = element.urls.small
                let imageLink = document.createElement('a')
                imageLink.href = element.links.html
                imageLink.target = "_blank"

                imageLink.appendChild(image)
                imageBox.appendChild(imageLink)

            });

            showMore.style.display = 'block'


        }
        else if (results.length === 0) {
            imageBox.style.display = 'none'
            noResult.style.display = 'block'
            showMore.style.display = 'none'
            // console.log("None")
        }
    }

}

searchBtn.addEventListener("click", (e) => {
    e.preventDefault()
    page = 1
    showImage()


})

searchForm.addEventListener("submit", (e) => {
    e.preventDefault()
    page = 1
    showImage()


})

showMore.addEventListener('click', () => {
    page += 1
    showImage()
})

