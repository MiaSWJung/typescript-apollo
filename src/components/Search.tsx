import React, {useState} from "react";
import {useLazyQuery} from "@apollo/client";
import Link from './Link';
import {FEED_SEARCH_QUERY} from '../queries'

const Search = () =>{
  const [searchFilter, setSearchFilter] = useState('');
  const [executeSearch, {data}] = useLazyQuery( FEED_SEARCH_QUERY );
  return (
    <>
      <div>
        Search
        <input type="text" onChange={(e)=> setSearchFilter(e.target.value)}/>
        <button onClick={()=> executeSearch({
          variables : { filter : searchFilter }}
        )}> OK </button>
      </div>
      {data &&
        data.feed.links.map((link:any, index:number)=>(
          <Link link={link} index={index} key={link.id} />
          // 검색 결과와 함께 link 제공
        ))}
    </>
  )
}
export default Search;