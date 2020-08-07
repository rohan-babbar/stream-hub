<!--Client Side javascript-->
console.log('Client Side javascript Is Loaded')

 const movieForm = document.querySelector('form') //target by element name
 const search = document.querySelector('input')//target by element name
 const messageOne = document.querySelector('#message-1') //target by id value of element
const messageTwo = document.querySelector('#message-2') //target by id value of element
//messageOne.textContent = 'From Javascript'

   movieForm.addEventListener('submit',(e)=>{
        e.preventDefault()
         const name = search.value //value which user types
         messageOne.textContent = 'Loading...'
        messageTwo.textContent = ''
               fetch('/movie?name='+name).then((response)=>{
                response.json().then((data)=>{
                if(data.error){
               messageOne.textContent=data.error
            }else{
                    messageOne.innerHTML = unescape(`<ul> 
                        <li><b>Title : ${data.title}</b></li> 
                        <li><b>Plot : ${data.plot}</b></li>
                        <li><b>Genre : ${data.genre}</b></li>
                        <li><b>Starring : ${data.actors}</b></li>
                        <li><b>IMDb : ${data.imdbRating}</b></li>
                        <li><b>Release Date : ${data.dvd}</b></li>
                        <li><img src="${data.poster}"border="100"></li>
                        </ul>`);
            }
        })
    })
})