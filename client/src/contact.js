import React from 'react'; 
import {Link} from 'react-router-dom';

function contact() {
    return <div className = "contactPage">

        {/* external stylesheets */ }
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
        <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto'/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

        <body class="w3-light-grey">

        <div className = "w3-top">
            <div className= "w3-bar w3-theme w3-top w2-left-align w3-large">
                <a class="w3-bar-item w3-button w3-right w3-hide-large w3-hover-white w3-large w3-theme-l1" href="javascript:void(0)" onclick="w3_open()"><i class="fa fa-bars"></i></a>
                <a href="/" class="w3-bar-item w3-button w3-theme-l1"><i class="fa fa-home fa-fw w3-margin-left w3-large w3-text-black"></i>Home</a>
            </div>
        </div>


<div class="w3-content">

  <div class="w3-row-padding">

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
            particularly in Austin, Texas - though I'm open to positions 
            across the US. I'll be available 
            to begin working in May 2022. 
            Below, I'll include my resume with as much
            identifying information removed as possible for obvious
            reasons. If you'd like a copy of my full resume, please 
            get in contact with me at cms351@txstate.edu. 
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
          <h4>Student Worker</h4>
          <h6>Texas State University</h6>
          <h6 class="w3-text-teal"><i class="fa fa-calendar fa-fw w3-margin-right"></i>May 2020 - May 2021</h6>
          <div class="w3-light-grey w3-round-xlarge">
            <div class="w3-round-xlarge w3-teal"></div>
          </div>
          <h4>Lead Cook</h4>
          <h6>Mama Fu's Asian House</h6>
          <h6 class="w3-text-teal"><i class="fa fa-calendar fa-fw w3-margin-right"></i>January 2020 - March 2020</h6>
          <div class="w3-light-grey w3-round-xlarge">
            <div class="w3-round-xlarge w3-teal"></div>
          </div>
          <h4>Fry Cook</h4>
          <h6>Saltgrass Steakhouse</h6>
          <h6 class="w3-text-teal"><i class="fa fa-calendar fa-fw w3-margin-right"></i>April 2019 - December 2019</h6>
          <div class="w3-light-grey w3-round-xlarge">
            <div class="w3-round-xlarge w3-teal"></div>
          </div>
          <h4>Lead Cook</h4>
          <h6>Delicious Garden New Braunfels</h6>
          <h6 class="w3-text-teal"><i class="fa fa-calendar fa-fw w3-margin-right"></i>December 2017 - April 2019</h6>
          <div class="w3-light-grey w3-round-xlarge">
            <div class="w3-round-xlarge w3-teal"></div>
          </div>
          <br/>
        </div>
      </div><br/>

    </div>

    <div class="w3-twothird">

        <div class="w3-container w3-card w3-white">
            <h2 class="w3-text-grey w3-padding-16"><i class="fa fa-certificate fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>Education</h2>
            <div class="w3-container">
                <h5 class="w3-opacity"><b>Texas State University</b></h5>
                <h6 class="w3-text-teal"><i class="fa fa-calendar fa-fw w3-margin-right"></i>August 2017 - May 2022</h6>
                <p>Relevant coursework: Software Engineering, Object-Oriented Programming, Operating Systems, Data Structures and Algorithms, Fundamentals of Algorithm Design and Analysis</p>
                <p>Distinctions: Dean's List 2019, 2020.</p>
            </div>
        </div>

        <div class="w3-container w3-card w3-white w3-margin-bottom">
            <h2 class="w3-text-grey w3-padding-16"><i class="fa fa-globe fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>Projects</h2>
            <div class="w3-container">
                <h5 class="w3-opacity"><b>Energy Expenditure Tracker</b></h5>
                <h6 class="w3-text-teal"><i class="fa fa-calendar fa-fw w3-margin-right"></i>June 2021 - December 2021</h6>
                <p>- This website. Precisely calculates and outputs users’ average daily calorie expenditure by tracking their daily weight and calorie intake.</p>
                <p>- Fully implemented account creation with login integration by updating a SQL database, with validation functionality.</p>
                <p>- Functional UI allows users to update the server with new weight / calorie logs and displays past inputs.</p>
                <p>- Integrated MySQL database backend using Node and Express with React frontend.</p> 
                <hr/>
            </div>
            <div class="w3-container">
                <h5 class="w3-opacity"><b>Mandelbrot Fractal Zoomer</b></h5>
                <h6 class="w3-text-teal"><i class="fa fa-calendar fa-fw w3-margin-right"></i>August 2021 - August 2021</h6>
                <p>- Built program that generates / animates a colored Mandelbrot fractal, slowly zooming in.</p>
                <p>- Internalized and translated Mandelbrot equation into code to generate the fractal.</p>
                <p>- Determines pixel brightness by number of iterations for the output to reach infinity</p>
                <p>- Built using C++ and the SDL multimedia library.</p>
                <hr/>
            </div>
            <div class="w3-container">
                <h5 class="w3-opacity"><b>Stock Tracker</b></h5>
                <h6 class="w3-text-teal"><i class="fa fa-calendar fa-fw w3-margin-right"></i>August 2021 - December 2021</h6>
                <p>- Collaboratively built within a team of four a web app that saves and displays users' stock portfolios, those stocks' price history, and the price of any stock outside their portfolio.</p>
                <p>- Personally responsible for entirety of backend and SQL implementation.</p>
                <p>- Integrated MySQL database backend using Node and Express with React frontend</p>
                <hr/>
            </div>
            <div class="w3-container">
                <h5 class="w3-opacity"><b>Linux Function Implementation</b></h5>
                <h6 class="w3-text-teal"><i class="fa fa-calendar fa-fw w3-margin-right"></i>June 2021 - June 2021</h6>
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