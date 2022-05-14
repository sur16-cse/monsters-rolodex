//import logo from './logo.svg';
//React is given class component
import { Component } from 'react'
import CardList from './components/card-list/card-list.component'
import SearchBox from './components/search-box/search-box.component';
import './App.css';
//component is meant to tie to tother functionala nd visual representation
//and it also tie together reusable portion of code into one set
//app component -- all of ui lies in this component
class App extends Component{
  //whenever this app is created instantiate first
  constructor(){
    //super call other constructor methods that is instantiating
    super();
    //creating empty array to initialise a value
    this.state={
      monsters:[],
      searchField:''
      };
      
  }

  componentDidMount()
  {
      fetch('https://jsonplaceholder.typicode.com/users')
      .then((response)=>response.json())
      //whatever return from the response that get stored in user as a parameter
      .then((users)=>
        this.setState(
          ()=>{
            return {monsters:users};
          },
      ))
  }
  onsearchChange=(event)=>{
    const searchField=event.target.value.toLocaleLowerCase();
      this.setState(()=>{
        return { searchField }
      },
    )
  }
  render(){
    //console.log('render from app.js')
    const {monsters,searchField}=this.state;
    const {onsearchChange} = this;
    //.filter gives back new array
    const filteredMonsters=monsters.filter((monster)=>{
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <h1 className='app-title'>Monsters Rolodex</h1>
        <SearchBox onChangeHandler={onsearchChange} 
        placeholder='search-monsters'
        className='search-box'/>
        <CardList monsters={filteredMonsters}/>
      </div>
    );
  }
}

export default App;
