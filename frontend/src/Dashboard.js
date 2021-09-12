import { useState , useEffect } from 'react'
import { Container , Form} from 'react-bootstrap'
import useAuth from './useAuth'
import SpotifyWebApi from 'spotify-web-api-node'
import TrackSearchResult from './TrackSearchResult'
import Player from './Player'
import axios from 'axios'
import url from './url';
import FavoriteBtn from './FavoriteBtn';

const spotifyApi = new SpotifyWebApi({
    clientId : "67c9d920c3564f2d9f2d276ffcf72301"
})

const favoriteData = [
    'coldplay',
    'oasis',
    '아이유',
    '버즈',
    '김형중',
    'firework',
]

const Dashboard = ({ code }) => {
    const accessToken = useAuth(code)
    const [search , setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack , setPlayingTrack] = useState();
    const [lyrics , setLyrics] = useState("");

    function chooseTrack(track) {
        setPlayingTrack(track)
        setSearch('')
        setLyrics('')
    }

    useEffect(() => {
        if(!playingTrack) return 

        axios.get(url + "/lyrics", {
            params : {
                track : playingTrack.title,
                artist : playingTrack.artist
            }
        }).then(res => {
            setLyrics(res.data.lyrics)
        })


    }, [playingTrack])

    useEffect(() => {
        if(!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    useEffect(() => {
        if(!search) return setSearchResults([])
        if(!accessToken) return

        let cancel = false;
        spotifyApi.searchTracks(search).then(res => {
           
            const results = res.body.tracks.items.map(track => {

                const smallestAlbumImage = track.album.images.reduce((smallest,image) => {
                    if(image.height < smallest.height) return image
                    return smallest
                }, track.album.images[0])

                return {
                    artist : track.artists[0].name,
                    title : track.name,
                    uri : track.uri,
                    albumUrl : smallestAlbumImage.url
                }
            })
            
            if(cancel) return 
            setSearchResults(results);
        })

        return () => cancel = true;

    }, [search, accessToken])

    const setSearchName = (e) => { 
        setSearch(e.target.value)
    }

    return (
        <Container className="d-flex flex-column py-2" style={{height : "100vh"}}>
            <Form.Control type="search" 
                placeholder="음악명이나 아티스트명을 입력해주세요!" 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
            />
            <div className="py-2">
                <p>
                    즐겨찾기 
                    {favoriteData.map((data,idx) => {
                        return (
                            <FavoriteBtn key={idx} setSearchName={setSearchName} value={data}/>
                        )
                    })}
                </p>
            </div>
            <div className="flex-grow-1 my-2" style={{ overflowY : "auto"}}>
                {searchResults.map(track => (
                    <TrackSearchResult track={track} key={track.uri} chooseTrack={chooseTrack} />
                ))}
                {searchResults.length === 0 && (
                    <div className="text-center" style={{ whiteSpace : "pre"}}>
                    {lyrics}
                    </div>
                )}
            </div>
            <div>
                <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
            </div>
        </Container>
    )
}

export default Dashboard
