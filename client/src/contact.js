import React from 'react'; 


function contact() {

  // opens up the menu
  function w3_open() {
        
    if (
      document.getElementById("mySidebar") &&
      document.getElementById("main")
    ) {
      document.getElementById("main").style.marginLeft = "25%";
      document.getElementById("mySidebar").style.width = "25%"; 
      document.getElementById("mySidebar").style.display = "block"; 
    }
  }

  // closes the menu
  function w3_close() {
    if (
      document.getElementById("mySidebar") &&
      document.getElementById("main") &&
      document.getElementById("myOverlay")
    ) {
      document.getElementById("main").style.marginLeft = "0%"; 
      document.getElementById("mySidebar").style.width = "0%"; 
      document.getElementById("mySidebar").style.display = 'none'; 
      document.getElementById("myOverlay").style.display = 'none'; 
    }
  }
  
  // retitle tab name in browser
  document.title = "Dev Resume - TDEETracker.com"; 

  return <div className = "contactPage">

    {/* external stylesheets */ }
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
    <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto'/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
    <link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-black.css"/>

    

    <body class="w3-light-grey">

    {/*navbar at top */}
    <div className = "w3-top">
      <div className= "w3-bar w3-theme w3-top w2-left-align w3-large">
        <a class="w3-bar-item w3-button w3-right w3-hide-large w3-hover-white w3-large w3-theme-l1" onClick={w3_open}><i class="fa fa-bars"></i></a>
        <a href="/" class="w3-bar-item w3-button w3-theme-l1">TDEETracker.com</a>
      </div>
    </div>

    {/* sidebar */}
    <nav class="w3-sidebar w3-bar-block w3-collapse w3-large w3-theme-l5 w3-animate-left" id="mySidebar">
      <a onClick={w3_close} class="w3-right w3-xlarge w3-padding-large w3-hover-black w3-hide-large" title="Close Menu">
        <i class="fa fa-remove"></i>
      </a>
      <h4 class="w3-bar-item"><b>Menu</b></h4>
      <a class="w3-bar-item w3-button w3-hover-black" href="/">Home</a>
      <a class="w3-bar-item w3-button w3-hover-black" href="/helpPage">Help</a>
      <a class="w3-bar-item w3-button w3-hover-black" href="/reportBug">Report Bug</a>
    </nav>

    {/* overlay effect when opening sidebar on small screens */ }
    <div class="w3-overlay w3-hide-large" onClick={w3_close} title="closing side menu" id="myOverlay"></div>


    <div class="w3-main" id="main">

      <div class="w3-row w3-padding-64">

        <div class="w3-container">
          <h1 class="w3-text-teal">About the Developer</h1>
          <p>
            Hi! Thanks for taking an interest in me and my work. My name
            is Clayton and I'm a senior in the computer science program
            at Texas State University. This website was built to be a 
            part of my professional portfolio. I wanted to demonstrate 
            that I could solve a personal problem in my life using my 
            software development skills, and even better, that I could 
            attract some number of other users to a product I've built. 
            Currently, I'm looking for an entry level software position,
            particularly in Austin, Texas - though I'm open to remote work
            and willing to relocate to other cities in US. I'll be available 
            to begin working in May 2022. 
            Below, I'll include my resume with as much
            identifying information removed as possible for obvious
            reasons. If you'd like a copy of my full resume, please 
            get in contact with me at <i>cms351@txstate.edu.</i>
          </p>
          <hr/>
        </div>

        <div class="w3-third">
    
          <div class="w3-white w3-text-grey w3-card-4">
            <div class="w3-container">
              <h2>Clayton</h2>
              <p><i class="fa fa-briefcase fa-fw w3-margin-right w3-large w3-text-teal"></i>Software Engineer</p>
              <p><i class="fa fa-home fa-fw w3-margin-right w3-large w3-text-teal"></i>Austin, TX</p>
              <p><i class="fa fa-envelope fa-fw w3-margin-right w3-large w3-text-teal"></i>cms351@txstate.edu</p>
              <p><i class="fa fa-phone fa-fw w3-margin-right w3-large w3-text-teal"></i>Email for phone number</p>
              <hr/>

              <p class="w3-large"><b><i class="fa fa-asterisk fa-fw w3-margin-right w3-text-teal"></i>Skills</b></p>
              <p>C++</p>
              <p>JavaScript, React, Express, Node</p>
              <p>Java</p>
              <p>SQL</p>
              <p>C</p>
              <p>Linux and the Unix Command Line</p>
              <hr/>

              <p class="w3-large w3-text-theme"><b><i class="fa fa-suitcase fa-fw w3-margin-right w3-text-teal"></i>Employment History</b></p>
              <h4><b>Student Worker</b></h4>
              <h6><i>Texas State University</i></h6>
              <h6 class="w3-text-teal"><i class="fa fa-calendar fa-fw w3-margin-right"></i>May 2020 - May 2021</h6>
              <div class="w3-light-grey w3-round-xlarge">
                <div class="w3-round-xlarge w3-teal"></div>
              </div>
              <h4><b>Lead Cook</b></h4>
              <h6><i>Mama Fu's Asian House</i></h6>
              <h6 class="w3-text-teal"><i class="fa fa-calendar fa-fw w3-margin-right"></i>January 2020 - March 2020</h6>
              <div class="w3-light-grey w3-round-xlarge">
                <div class="w3-round-xlarge w3-teal"></div>
              </div>
              <h4><b>Fry Cook</b></h4>
              <h6><i>Saltgrass Steakhouse</i></h6>
              <h6 class="w3-text-teal"><i class="fa fa-calendar fa-fw w3-margin-right"></i>April 2019 - December 2019</h6>
              <div class="w3-light-grey w3-round-xlarge">
                <div class="w3-round-xlarge w3-teal"></div>
              </div>
              <h4><b>Lead Cook</b></h4>
              <h6><i>Delicious Garden New Braunfels</i></h6>
              <h6 class="w3-text-teal"><i class="fa fa-calendar fa-fw w3-margin-right"></i>December 2017 - April 2019</h6>
              <div class="w3-light-grey w3-round-xlarge">
                <div class="w3-round-xlarge w3-teal"></div>
              </div>
              <br/>
            </div>
          </div>
          
          <br/>

        </div>

        <div class="w3-twothird">

          <div class="w3-container w3-card w3-white">
           <h2 class="w3-text-grey w3-padding-16"><i class="fa fa-certificate fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>Education</h2>
            <div class="w3-container">
              <h5 class="w3-opacity"><b>Texas State University</b></h5>
              <h6><i>Bachelor's in Computer Science</i></h6>
              <h6 class="w3-text-teal"><i class="fa fa-calendar fa-fw w3-margin-right"></i>August 2017 - May 2022</h6>
              <p>Relevant coursework: Software Engineering, Object-Oriented Programming, Operating Systems, Data Structures and Algorithms, Computer Security.</p>
              <p>Distinctions: Dean's List 2019, 2020.</p>
            </div>
          </div>

          <div class="w3-container w3-card w3-white w3-margin-bottom">
            <h2 class="w3-text-grey w3-padding-16"><i class="fa fa-globe fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>Projects</h2>
            <div class="w3-container">
              <h5 class="w3-opacity"><b>TDEETracker.com</b></h5>
              <h6 class="w3-text-teal"><i class="fa fa-calendar fa-fw w3-margin-right"></i>July 2021 - February 2022</h6>
              <p>- This website. Complete website that calculates users' TDEE by tracking daily weight/calorie fluctuations.</p>
              <p>- Fully implemented account registration/login integration by updating a SQL database with password encryption.</p>
              <p>- Functional UI allows users to update the server with new weight / calorie logs and displays past inputs.</p>
              <p>- Integrated MySQL database backend using Node and Express with React frontend.</p> 
              <hr/>
            </div>
            <div class="w3-container">
              <h5 class="w3-opacity"><b>Mandelbrot Fractal Zoomer</b></h5>
              <h6 class="w3-text-teal"><i class="fa fa-calendar fa-fw w3-margin-right"></i>July 2021 - August 2021</h6>
              <p>- Built program that generates / animates a colored Mandelbrot fractal, slowly zooming in.</p>
              <p>- Internalized and translated Mandelbrot equation into code to generate the fractal.</p>
              <p>- Determines pixel brightness by number of iterations for the output to reach infinity</p>
              <p>- Built using C++ and the SDL multimedia library.</p>
              <hr/>
            </div>
            <div class="w3-container">
              <h5 class="w3-opacity"><b>Linux Function Implementation</b></h5>
              <h6 class="w3-text-teal"><i class="fa fa-calendar fa-fw w3-margin-right"></i>May 2021 - July 2021</h6>
              <p>- Built imitation Linux terminal commands as its own C program.</p>
              <p>- Accepted commands and options as user input with full functionality.</p>
              <p>- Fully functional "pipe" command and input and output redirection, all written in C.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </body>
  </div>
}
export default contact; 