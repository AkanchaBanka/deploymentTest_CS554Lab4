import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const md5 = require('blueimp-md5');
const publickey = '21a05f08ea68093e8ea155246713474a';
const privatekey = '80279471a0f99fdd016e538442df5481af7fb593';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = 'https://gateway.marvel.com:443/v1/public/comics';
const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
console.log(url);

const ComicInfo = (props) => {

    const [comicInfo, setComicInfo] = useState(undefined);
    const { id } = useParams();
    console.log(id);

    useEffect(

        () => {
            console.log("ComicInfo useeffect");

            async function fetchData() {
                try {
                    const comicUrl= baseUrl+'/' + id +'?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
                    console.log(comicUrl);
                    const { data } = await axios.get(comicUrl);
                    setComicInfo(data.data.results);
                    console.log('param is' + id);
                    console.log(comicInfo);
                } catch (e) {
                    console.log(e);
                }

            }
            fetchData();
        }, [id]
    )

    return (
        <div className="characterinfo">

            {!comicInfo ? (
                <p>error 404 not found</p>
            ): (
                <div>

                    <p className="charactername"><b>Name: {comicInfo[0] && comicInfo[0].title}</b></p>
                    <p>Id: {comicInfo[0] && comicInfo[0].id}</p>
                    <p>Description: {comicInfo[0] && comicInfo[0].description}</p>

                </div>
            )
            }
        </div >
    )

}

export default ComicInfo;