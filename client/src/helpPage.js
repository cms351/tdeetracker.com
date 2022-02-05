import React from 'react';

function help() {

    // retitle tab name in browser
    document.title = "Help - TDEETracker.com"; 

    // open menu function
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

    // close menu function
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

    return <div className = "helpPage">

        {/* external stylesheets */ }
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
        <link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-black.css"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
        
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
            <a class="w3-bar-item w3-button w3-hover-black" href="/contact">Developer Info</a>
            <a class="w3-bar-item w3-button w3-hover-black" href="/reportBug">Report Bug</a>
        </nav>

        {/* overlay effect when opening sidebar on small screens */ }
        <div class="w3-overlay w3-hide-large" onClick={w3_close} title="closing side menu" id="myOverlay"></div>

        {/* Main content - shift to right 250px when the sidebar is visible */ } 

        <div class="w3-main" id="main">

            <div class="w3-row w3-padding-64">
                <div class="w3-container">
                    <h1 class="w3-text-teal">Help</h1>
                    <p>
                        Welcome to TDEETracker.com. If you're here, that means
                        you need some help getting started. Basically, what you're
                        going to want to do with this site is track your daily 
                        calorie intake and weight each day and record them on this 
                        website. Personally, I use &nbsp;
                        <a href = "https://apps.apple.com/us/app/happy-scale/id532430574">Happy Scale</a> 
                        &nbsp;to track my weight and &nbsp;
                        <a href = "https://apps.apple.com/us/app/mikes-macros/id1046300591">Mike's Macros</a>
                        &nbsp;to track my calories, but feel free to use whatever works with you - even
                        pen and paper! After two weeks, this website will calculate exactly
                        how many calories you burn each day, and update that calculation over time - 
                        allowing you to more accurately adjust your food intake for your goals
                        as you gain or lose weight. 
                    </p>
                    <p>
                        If you need advice on weight loss or gain in general, there's 
                        resources for that, too. Try out these video playlists from a PhD in 
                        Sports Physiology: 
                        <br></br><br></br>
                        <a href = 'https://www.youtube.com/watch?v=EsNeZjjOOl4&list=PLyqKj7LwU2RulAjHczohbx5OyJQ8TaFM0&ab_channel=RenaissancePeriodization'>Fat Loss Dieting Made Simple</a>
                        <br></br>
                        <a href = 'https://www.youtube.com/watch?v=88z36xmf42Q&list=PLyqKj7LwU2Ru4UZgHYsjvHbRsV-qsewla&ab_channel=RenaissancePeriodization'>Muscle Gain Dieting Made Simple</a>
                        <br></br><br></br>
                        He can describe it better than I ever could hope to, but basically, you're
                        gonna want to do the following. 
                        <br></br>
                        1. Calculate approximately how many calories you <i>should</i> be eating. 
                        A good resource for this is &nbsp;
                        <a href = "https://tdeecalculator.net">TDEECalculator.net</a>. 
                        It's probably one of the most popular ways to estimate your TDEE using 
                        general formulas. 
                        <br></br>
                        2. Weigh yourself each morning. Track your calories and macros throughout
                        the day. Try to hit your calorie goals. At the end of the day, log your 
                        calorie and weight information on this website. Repeat each day. 
                        <br></br>
                        3. After about 2 weeks, take a look at what TDEE calculation this site 
                        gave you. That's about the most accurate TDEE calculation possible 
                        without some actual medical science going down. Now, create an
                        updated calorie goal with this more accurate TDEE. Basically, 
                        use the formula: TDEE + 500(x), 
                        where "x" is how many lbs you want to gain or lose per week. 
                        If you want to gain weight, use a positive x value. If you 
                        want to lose weight, use a negative x value. Generally, it 
                        isn't recommended that you try to gain or lose more than 1% of
                        your bodyweight per week. 
                        <br></br>
                        4. Repeat steps 2 and 3, basically forever.
                    </p>
                    <p>
                        <br/>
                        If you find yourself hitting your calorie goals but not your
                        weight goals, it's usually one of the common culprits:
                        <br></br><br/>
                        A. You aren't updating the site all 7 days of the week, 
                        which opens up opportunities for error. It's not 
                        &nbsp;<i>absolutely</i> necessary to log your data here every 
                        single day, but the less you do, the less accurate your 
                        TDEE calculation. 
                        <br></br>
                        B. You're underestimating your calorie intake. Super common. 
                        Track every single thing. Weigh your food and track it that
                        way. Be super meticulous about it until you have a really 
                        good sense of tracking your calories. You'll be surprised
                        how easy it is to overeat on some foods without realizing it. 
                        <br></br>
                        C. You haven't been tracking for very long. The body can do 
                        weird things when you start a new weight gain or loss diet. 
                        Give your tracking at least a month before you react too much 
                        to any weirdness. 
                    </p>
                    <p>
                        <br/>
                        I hope this is enough to get you started. If you need to 
                        learn more, some great resources are &nbsp;
                        <a href = "https://www.reddit.com/r/Fitness/">Reddit's fitness subreddit</a>&nbsp; 
                        and <a href="https://www.youtube.com/channel/UCfQgsKhHjSyRLOp9mnffqVg">Dr. Mike Israetel's YouTube channel</a> that we linked earlier. 
                    </p>
                </div>
            </div>
        </div>
    </div>

}
export default help; 