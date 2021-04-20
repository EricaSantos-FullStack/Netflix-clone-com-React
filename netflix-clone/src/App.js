/* eslint-disable import/no-anonymous-default-export */
import React, {useEffect, useState} from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow'
import Featured from './components/FeaturedMovie'
import Header from './components/Header'

export default () => {

  const [movieList, setmovieList] = useState([])
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setblackHeader] =useState(false)

  useEffect(() => {
    const loadAll = async () =>{
      let list = await Tmdb.getHomeList();
     setmovieList(list);

     let originals = list.filter(i => i.slug === 'originals');
     let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1 ));
      let chosem = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosem.id, 'tv');
      setFeaturedData(chosenInfo);
    }
    loadAll();
  
  },[])

  useEffect(() => {
    const scrollListener = () =>{
        if(window.scrollY > 10){
          setblackHeader(true);
        }
        else{
          setblackHeader(false);
        }
    }

    window.addEventListener('scroll', scrollListener);

    return() =>{
      window.removeEventListener('scroll', scrollListener)
    }
  },[])


  return(
    <div className="page"> 

      <Header black={blackHeader}/>

      {featuredData &&
        <Featured item={featuredData} />
      }

      <section className="lists">
        {movieList.map((item,key) => (
           <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
          <footer>
              Feito Por: Roy, Haile, Douglas e Erica <br/><br/>
              Direitos de imagem para Netflix<br/>
              Dados pegos so site Themoviedb.org
          </footer>
          {movieList.length <=0 &&
          <div className="loading">
              <img src="https://media.wired.com/photos/592744d3f3e2356fd800bf00/master/w_2560%2Cc_limit/Netflix_LoadTime.gif" alt="carregando"></img>
          </div>
          }
    </div>
  );
}