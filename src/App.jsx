// import { Component } from 'react/cjs/react.production.min';
import './App.css';
import wiki from './wiki.js';
import LoggedIn from "./components/Home/logged";
import NotLogged from "./components/Home/notLogged";

const App = (props) => {
  // const [isSignInVisible, setIsSignInVisible] = React.useState(false);
  const email = "mdweikat@fts.com";

  return (
    <div className="App">
      <span>{wiki()}</span>
      <div className="container d-flex justify-content-center mt-5">
        <div className="card">

          {/* {isSignInVisible ? <Icon label="asdaw" onClick={() => setIsSignInVisible(true)} /> : <SignIn />} */}

          
          <LoggedIn name="Mohammad Test" email={email} />

          <NotLogged />

          
        </div>
      </div>
    </div>
  );
}

// class App extends Component {

//   props

//   state = 
//   {
//     counter : 0,
//     isSignInVisible: false,
//   };
  

//   render()
//   {
//     return (
//     <div className="App">
//       <span>{wiki()}</span>
//       <div className="container d-flex justify-content-center mt-5">
//         <div className="card">

//           {this.state.isSignInVisible ? <Icon onClick={() => setIsSignInVisible(true)} /> : <SignIn />}

//           <div id="logged_in" style={{ display: "none" }}>

//             <div className="top-container">
//               <img src={profile} alt="profile" className="img-fluid profile-image" width="70" />
//               <div className="ml-3" style={{ marginLeft: "20px" }}>
//                 <h5 className="name">Mohammad Smadi</h5>
//                 <p className="mail">mo.smadi@outlook.com</p>
//               </div>
//             </div>

//             <hr/>

//             <div className="wishlist-border pt-2">
//               {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
//               <a href="#">
//                 <span className="wishlist">Websites used annotation</span>
//               </a>
//             </div>

//             <div className="fashion-studio-border pt-2" style={{ marginTop: "10px" }}>
//               {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
//               <a href="#">
//                 <span className="fashion-studio">Annotations in This Page</span>
//               </a>
//             </div>

//             <div className="fashion-studio-border pt-2" style={{ marginTop: "10px" }}>
//               {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
//               <a href="#">
//                 <span className="fashion-studio">About</span>
//               </a>
//             </div>


//             <div class=" pt-2" style={{ marginTop: "10px" }}>
//               <span class="fashion-studio">Wiki Search</span>
//               <div class="toggle-button-cover">
//                 <div class="button-cover">

//                   <div class="button r" id="button-1">
//                     <input type="checkbox" class="checkbox" />
//                     <div class="knobs"></div>
//                     <div class="layer"></div>
//                   </div>

//                 </div>
//               </div>
//             </div>


//           </div>


//           <div id="not_logged" style={{}}>
//             <h1 id="title">Annotations</h1>
//             <hr />
//             <div className="wishlist-border pt-2" style={{ marginBottom: "10px" }}>
//               {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
//               <a href="#">
//                 <span className="recent-orders"> Login / Signup </span>
//               </a>
//             </div>

//             <div className="wishlist-border pt-2">
//               {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
//               <a href="#">
//                 <span className="wishlist">Websites used anottation</span>
//               </a>
//             </div>

//             <div className="fashion-studio-border pt-2" style={{ marginTop: "10px" }}>
//               {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
//               <a href="#">
//                 <span className="fashion-studio">Annotations in This Page</span>
//               </a>
//             </div>

//             <div className="fashion-studio-border pt-2" style={{ marginTop: "10px" }}>
//               {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
//               <a href="#">
//                 <span className="fashion-studio">About</span>
//               </a>
//             </div>

//             <div class=" pt-2" style={{ marginTop: "10px" }}>
//               <span class="fashion-studio">Wiki Search</span>
//               <div class="toggle-button-cover">
//                 <div class="button-cover">
//                   <div class="button r" id="button-1">
//                     <input type="checkbox" class="checkbox" name={props.name}  defaultChecked={props.defaultChecked}  onChange={ this.handleChange() }/>
//                     <div class="knobs"></div>
//                     <div class="layer"></div>
//                   </div>

//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
//   }

//   handleChange()
//   {
//     let {counter} = this.state;
    
//     if (counter===0)
//     {
//       console.log("no")
//       counter=1;
//     }
//     else
//     {
//       console.log("yes")
//       counter=0;
//     }
//   }


  
//   applyWiki()
//   {
//     // if wiki option is on (run the wiki feature)
//     // else -> disable it
//   }
// }



export default App;