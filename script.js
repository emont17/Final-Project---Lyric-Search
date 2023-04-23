const form = document.getElementById("search");
const search = document.getElementById("lyricSearch");
const result = document.getElementById("search-result");

const api = "https://api.lyrics.ovh";


form.addEventListener("submit",e => {
	e.preventDefault();
	let searchValue = search.value.trim();

	if(!searchValue) {
		alert("please input the search field");
	} else {
		getResult(searchValue);
	}
})


async function getResult(searchValue) {
	const searchResult = await fetch (`${api}/suggest/${searchValue}`);
	const links= await searchResult.json();
    // console.log(data);
	 showData(links);
}

function showData(links) {
	result.innerHTML = `
	<ul class="lyrics">
	    ${links.data
         .map(song=> `<li>
                          <span class="attribute" song-title = "${song.title_short}"
                           song-artist = "${song.artist.name}"><strong>${song.title_short}</strong>-${song.artist.name}</span>
                        </li>`
         	)
         .join("")
	  }
	</ul>
	`;
}

result.addEventListener("click",x => {
	const clickedButton = x.target;

	if(clickedButton.className === 'attribute') {
		const artist = clickedButton.getAttribute('song-artist');
		const songTitle = clickedButton.getAttribute('song-title');

		getLyrics(artist , songTitle);
	} 
})

async function getLyrics(artist , songTitle) {
	const response = await fetch(`${api}/v1/${artist}/${songTitle}`);
	const data = await response.json();
	const lyrics = data.lyrics
    if (lyrics === undefined){
        alert("Lyrics don't exist in this api");
        console.log("Lyrics don't exist in this api");
    }

	result.innerHTML = `<h2 id="lyricsHead"><strong>${songTitle}</strong> - ${artist}</h2>
	
	<p id="lyrics-display">${lyrics}</p>`;

}	
