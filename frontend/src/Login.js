import React from 'react'
import { Container } from "react-bootstrap"

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=67c9d920c3564f2d9f2d276ffcf72301&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

export default function Login(){
    return (
        <Container className="d-flex justify-content-center align-items-center" style={{minHeight : "100vh"}}>
            <div>
                <p className="text-muted text-xl">안녕하세요?</p>
                <a href={AUTH_URL} className="btn btn-success btn-lg">
                    스포티파이로 로그인하기
                </a>
            </div>
        </Container>
    )
}
