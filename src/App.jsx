import { useCallback, useRef } from "react";
import "./App.css";
import UseBookQuery from "./UseBookQuery";

function App() {
  const observerRef = useRef();
  const { books, handleInput, loading ,handlePage} = UseBookQuery();
  const observerCallback = useCallback((node) => {
    if (loading) return
    if(observerRef.current) observerRef.current.disconnect()
    observerRef.current = new IntersectionObserver((entries)=>{
      if(entries[0].isIntersecting){
        handlePage()
      }
    })
    if (node) observerRef.current.observe(node)
  }, [loading]);
  return (
    <div className="App">
      <input placeholder="enter any input" onChange={handleInput} />
      {
        books?.map((title, index) => {
          if(books.length==index+1){
            return (
              <div ref={observerCallback} key={`${title}-${index}`}>
                {index}:{title}
              </div>)
          }else{
          return (
            <div  key={`${title}-${index}`}>
              {index}:{title}
            </div>
          )};
        })
      }
      <div>{loading && 'Loading...'}</div>
    </div>
  );
}

export default App;
