var $mins = $("#mins");
var $secs = $("#sec");
var secVal = $secs.html();
var userMinute = $mins.text();
var $startTimer = $("#startTimer");
var $resetTimer = $("#resetTimer");
var $pauseTimer = $("#pauseTimer");
var $inputTask = $("textarea");
var $incBtn = $("#inc");
var $decBtn = $("#dec");
var userTask;
var countDown;

$(document)
  .ready(function() {

    $incBtn.click(increment);
    $decBtn.click(decrement);

    $inputTask.keypress(function(e) {
      if (e.which == 13) {
        userTask = $(this)
          .val();
        $inputTask.blur();
        startTimer();
      }
    });

    $startTimer.click(startTimer);

    function reset() {
      $secs.text("00");
      $mins.text(userMinute);
      secVal = 0;
      userMinute = $mins.text();
    }

    function secInterval() {
      if ($mins.text() != -1 && secVal == 0) {
        secVal = 60;
      }
      secVal -= 1;

      if (secVal == 59) {
        userMinute -= 1;
      }
      $mins.text(userMinute);

      if (secVal.toString()
        .length == 1) {
        $secs.html("0" + secVal);
      } else {
        $secs.html(secVal);
      }
      stopTimer();
    }

    function startTimer() {
      if (userMinute <= 0) {
        alert("Please enter a correct time");
      } else {
        $startTimer.html("Resume");

        countDown = setInterval(secInterval,
          1000);

        $startTimer.attr("class", "hide");
        $pauseTimer.removeAttr("class", "hide");
        $incBtn.attr("class", "hideFade");
        $decBtn.attr("class", "hideFade");

        $resetTimer.click(function() {
          reset();
          clearInterval(countDown);
          $startTimer.html("Start");
          $pauseTimer.attr("class", "hide");
          $startTimer.removeAttr("class", "hide");
          $incBtn.removeAttr("class", "hideFade");
          $decBtn.removeAttr("class", "hideFade");
          userMinute = 25;

        });

        $pauseTimer.click(function() {
          pauseTimer(countDown);
          $startTimer.removeAttr("class", "hide");
          $pauseTimer.attr("class", "hide");

        });
      }
    }

    function stopTimer() {
      if (userMinute == 0 && secVal == 0) {
        clearInterval(countDown);
      }
    }

    function pauseTimer(countDown) {
      clearInterval(countDown);
      $("#startTimer")
        .attr("disabled", false);
    }

    function increment() {
      var incMin = parseInt($mins.text());
      userMinute = incMin += 5;
      $mins.html(userMinute);
    }

    function decrement() {
      var decMin = parseInt($mins.text());
      userMinute = decMin -= 5;
      if (userMinute < 0) {
        userMinute = 0;
      }
      $mins.html(userMinute);

    }
  });
