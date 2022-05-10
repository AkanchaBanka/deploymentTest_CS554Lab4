import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const md5 = require('blueimp-md5');
const publickey = '21a05f08ea68093e8ea155246713474a';
const privatekey = '80279471a0f99fdd016e538442df5481af7fb593';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = 'https://gateway.marvel.com:443/v1/public/series';
const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
console.log(url);

const SeriesInfo = (props) => {

    const [seriesInfo, setSeriesInfo] = useState(undefined);
    const { id } = useParams();
    console.log(id);

    useEffect(

        () => {
            console.log("SeriesInfo useeffect");

            async function fetchData() {
                try {
                    const seriesUrl= baseUrl+'/' + id +'?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
                    console.log(seriesUrl);
                    const { data } = await axios.get(seriesUrl);
                    setSeriesInfo(data.data.results);
                    console.log('param is' + id);
                    console.log(seriesInfo);
                } catch (e) {
                    console.log(e);
                }

            }
            fetchData();
        }, [id]
    )

    return (
        <div className="characterinfo">

            {!seriesInfo ? (
                <p>error 404 not found</p>
            ): (
                <div>

                    <p className="charactername"><b>Name: {seriesInfo[0] && seriesInfo[0].title}</b></p>
                    <p>Id: {seriesInfo[0] && seriesInfo[0].id}</p>
                    <p>Description: {seriesInfo[0] && seriesInfo[0].description}</p>

                </div>
            )
            }
        </div >
    )

}

export default SeriesInfo;