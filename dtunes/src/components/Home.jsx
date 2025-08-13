import PlaylistItem from "./PlaylistItem";
import { v4 as uuid } from 'uuid'
import SongItem from "./SongItem";
import { useContext, useEffect } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { assets } from "../assets/user/assets";
import DisplaySongsUsers from "./DisplaySongsUsers";
import UserItem from "./UserItem";
import useAuth from "../hooks/useAuth";


export default function Home({ setBgColor }) {
    const { songsData, playlistsData, track, searchQuery, usersData } = useContext(PlayerContext);

    //jwt:
    const { auth } = useAuth();
    const { loggedIn, user } = auth;

    useEffect(() => {
        setBgColor('#121212');
    }, []);

    return (
        <>
            {/* DISPLAY OF USERS:  (Only if searching and usersData is not empty)*/}

            {searchQuery.filter === 'users' && usersData &&
                <DisplaySongsUsers heading='Users:'>
                    {usersData.map(otherUser => {
                        //if logged in, don't display the same user in list
                        if (!loggedIn || otherUser._id !== user._id) {
                            return <UserItem key={uuid()} id={otherUser._id} username={otherUser.username} name={otherUser.name} profileColor={otherUser.profileColor} isArtist={otherUser.isArtist} />
                        }
                    })}
                </DisplaySongsUsers>}

            {/* DISPLAY OF PLAYLISTS: */}

            {/* DISPLAY OF SONGS: */}

            <DisplaySongsUsers heading='Songs:'>
                {songsData.map((sd) => <SongItem key={uuid()} name={sd.name} desc={sd.desc} image={sd.image} id={sd._id} likes={sd.likes} dislikes={sd.dislikes} currentlyPlaying={track._id && track._id === sd._id} />)}
            </DisplaySongsUsers>

        </>
    )
}
