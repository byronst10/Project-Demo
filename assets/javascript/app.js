//TIMER
var time = document.getElementById('timer');
var start = document.getElementById('start');
var pause = document.getElementById('pause');
var stop = document.getElementById('stop');
var seconds = 0;
var minutes = 0;
var hours = 0;
var t;

var addedSeconds = 0, addedMinutes = 0, addedHours = 0, addedTime = 0.01, newTime = 0;


function add()
{
    seconds++;
    if (seconds >= 60)
    {
        seconds = 0;
        minutes++;
        if (minutes >= 60)
        {
            minutes = 0;
            hours++;
        }
    }

    time.innerHTML = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
        ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}

function timer()
{
      t = setTimeout(add, 1000);
}

  $("#quoteButton").on("click", function() {

    quote();
  });

  $("#start").on("click", function(event) {
    event.preventDefault();
    $("#start").empty().append("Start");
    clearTimeout(t);
    timer();
    console.log("Start");
});

$("#pause").on("click", function(){
clearTimeout(t);
$("#start").empty().append("Start");
});

$("#stop").on("click", function() {
    if (seconds === 0 && minutes ===0 && hours === 0) {
        return;
    }

quote();
$("#start").empty().append("Start");
clearInterval(t);
time.textContent = "00:00:00";
seconds = 0;
minutes = 0;
hours = 0;


});

function quote() {
    $.ajax({
      url: "https://api.forismatic.com/api/1.0/",
      jsonp: "jsonp",
      dataType: "jsonp",
      data: {
        method: "getQuote",
        lang: "en",
        format: "jsonp"
      },
      success: function(response) {
        $('#quote').html(response.quoteText)
        $('#author').html("<br/>&dash; " + response.quoteAuthor);
      }
    })
  }
  //Chart section
  let myChart = document.getElementById('myChart').getContext('2d');
    //Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.defaultFontColor = '#777';
    let StudyChart = new Chart(myChart, {
    type: 'bar', //bar, horizontal, pie, line
    data:{
        labels:['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets:[{
        label: 'Days',
        data:[
            4,
            6,
            8,
            5,
            3,
            0
            ],
            backgroundColor:[
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 99, 132, 0.6)'
                ],
                borderWidth:2,
                hoverBorderWidth:3,
                hoverBorderColor:'red',
        }]
    },
    options:{
        title:{
            display: true,
            text: 'Daily Study Time',
            fontSize: 25
        },
    legend:{
        display: false,
        position:'right',
        labels:{
            fontColor:'#000'
        }
    },
    layout:{
        padding:{
            left:50,
            right:0,
            bottom:0,
            top: 0
    }
    }
    }
  });