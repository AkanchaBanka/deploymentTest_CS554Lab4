import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,useNavigate,Link } from 'react-router-dom';

const md5 = require('blueimp-md5');
const publickey = '21a05f08ea68093e8ea155246713474a';
const privatekey = '80279471a0f99fdd016e538442df5481af7fb593';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = 'https://gateway.marvel.com:443/v1/public/comics';
const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
console.log(url);


const ComicsPage = (props) => {

    console.log(props);

    const [comicsData, setComicsData] = useState(undefined);
    const [totalPages, setTotalPages] = useState(0);
    const {page}= useParams();
    const navigate = useNavigate()

    useEffect(
        () => {
            console.log("enter useeffect");

            const limit=20;
            const offset = page * limit;

            async function fetchData() {
                try {

                    console.log(`${url}&limit=${limit}&offset=${offset}`);
                    const { data } = await axios.get(`${url}&limit=${limit}&offset=${offset}`);
                    console.log(data);
                    if(data.data.results.length === 0) {
                        navigate('/404');
                        return;
                    }
                    setComicsData(data.data.results);
                    setTotalPages(Math.ceil(data.data.total/limit))
                } catch (e) {
                    console.log(e);
                    navigate('/404');
                }
            }

            fetchData();
        }, [page]
    )


    return (
        <div>
            {comicsData && page > comicsData.count / 20 || page < 0 ? (<p>error</p>) : (

                <div>
                    {comicsData && comicsData.map((comic) => {
                            return (
                                <div className="pagecontainer" key={comic.id}>
                                    {/* <a className="pagecontent" href={`/pokemon/${pokemon, index + 1 + pageNumber * 20}`}>{pokemon.name}</a> */}
                                    <Link className="pagecontent" to={`/comics/${comic.resourceURI.split('/')[6]}`}>{comic.title}</Link>
                                </div>
                            )
                        }
                    )
                    }

                    {parseInt(page) >= 0 && parseInt(page) < totalPages && <div className="pagination">

                        {page && parseInt(page) <= 0 ? (<p></p>) : (
                            <Link to={`/comics/page/${parseInt(page) - 1}`}>
                                <button className="btn">Previous</button>
                            </Link>)}


                        {page && parseInt(page) === totalPages - 1 ? (<p></p>) : (
                            <Link to={`/comics/page/${parseInt(page) + 1}`}>
                                <button className="btn">Next</button>
                            </Link>)}
                    </div>}
                </div>

            )}


        </div>
    );

};

export default ComicsPage;