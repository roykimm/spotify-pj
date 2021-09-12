function TrackSearchResult({ track, chooseTrack }) {

    function handlePlay() {
        chooseTrack(track)
    }

    return (
        <div className="d-flex m-2 align-items-center"
            style={{ cursor : "pointer" }}
            onClick={handlePlay}
            >
            <img src={track.albumUrl} alt="" style={{height : "64px", width:"64px" }} />
            <div className="m-2">
                <div className="">{track.title}</div>
                <div className="text-muted">{track.artist}</div>
            </div>
        </div>
    )
}

export default TrackSearchResult
