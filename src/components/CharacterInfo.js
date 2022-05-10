import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const md5 = require('blueimp-md5');
const publickey = '21a05f08ea68093e8ea155246713474a';
const privatekey = '80279471a0f99fdd016e538442df5481af7fb593';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
console.log(url);

const CharacterInfo = (props) => {


    // const [characterId, setCharacterId] = useState(undefined);
    const [characterInfo, setCharacterInfo] = useState(undefined);
    const { id } = useParams();
    console.log(id);

    useEffect(

        () => {
            console.log("CharacterInfo useeffect");

            // setCharacterId(charId);

            async function fetchData() {
                try {
                    const charUrl= baseUrl+'/' + id +'?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
                    console.log(charUrl);
                    const { data } = await axios.get(charUrl);
                    setCharacterInfo(data.data.results);
                    console.log('param is' + id);
                    console.log(characterInfo);
                } catch (e) {
                    console.log(e);
                }

            }
            fetchData();
        }, [id]
    )

        return (
            <div className="characterinfo">

            {!characterInfo ? (
                <p>error 404 not found</p>
            ): (
            <div>

                <p className="charactername"><b>Name: {characterInfo[0] && characterInfo[0].name}</b></p>
                <p>Id: {characterInfo[0] && characterInfo[0].id}</p>
                <p>Description: {characterInfo[0] && characterInfo[0].description}</p>

            </div>
        )
    }
        </div >
    )
    
}

export default CharacterInfo;