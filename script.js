var pathlv = 'http://gvgmaps.com/mgs5/';
var langval = 'en';



// Image rollOver .
function rollOverImages(selector) {
  var tgt = $('.imgover');
  if (selector) tgt = $(selector);
  tgt.hover(

    function() {
      $(this).attr('src', $(this).attr('src').replace(/.(jpg|png|gif)$/, '_o.$1'));
    },

    function() {
      $(this).attr('src', $(this).attr('src').replace(/_o.(jpg|png|gif)$/, '.$1'));
    });
}

$(function() {
  rollOverImages();
});

var sigertime = 0;
var intervaltime = 1000;
var reverse_flag = false;

var dif_time = 0;
var reloadnum = 30;
var nowcount = 0;
var tid = null;

var second = {
  'w': 100,
  'h': 100
};
var nums = {
  'w': 35,
  'h': 25
};
var numl = {
  'w': 45,
  'h': 30
};

var tgt_date = '';
var now_date = '';
var init_flag = false;
var getdate_flag = true;

function get_content() {

  var text = '<div><div id="tgt_date">2015/09/01 03:00:00</div><div id="now_date">2015/05/26 20:16:30</div></div>';

  var todaysmotherfuckingdate = new Date();
  var motherfuckingreleasedate = new Date('09/01/2015 03:00 AM');

  //text = text.replace(/:pathlv:/g, pathlv);
  //text = text.replace(/:lang:/g, langval);
  console.log(text);
  var obj = $(text);
  if (obj.find('#tgt_date')[0]) {
    //console.log('next');
    if (getdate_flag) {
      getdate_flag = false;
      tgt_date = motherfuckingreleasedate;
      now_date = todaysmotherfuckingdate;
      dif_time = Math.round((motherfuckingreleasedate - todaysmotherfuckingdate) / 1000);

      nowcount = 0;

      if (!init_flag) {
        init_flag = true;
        countdown();
        $('.timerarea').css({
          'visibility': 'visible'
        });
      }
    }
  }
}

var basetimes = [60, 60, 24];

function getshowtimes() //return [秒,分,時,日].
  {

    var showtime = dif_time - sigertime;
    if (showtime <= 0) showtime = 0;

    var rets = [];

    rets[0] = showtime % basetimes[0];
    if (rets[0] <= 0) rets[0] = 0;

    showtime -= rets[0];

    var buff = 1;
    for (var ii = 1; ii <= 3; ii++) {
      buff *= basetimes[ii - 1];

      var tmp = showtime / buff;
      if (basetimes[ii]) {
        tmp = tmp % basetimes[ii];
      }

      if (tmp <= 0) tmp = 0;

      rets[ii] = tmp;
      showtime -= rets[ii] * buff;
    }
    return rets;
  }

var drawer = function() {

  var showtimes = getshowtimes();

  for (var ii = 0; ii < 4; ii++) {
    var num2 = Math.floor(showtimes[ii] / 10);
    var num1 = showtimes[ii] % 10;
    var todaysmotherfuckingdate = new Date();
    var motherfuckingreleasedate = new Date('09/01/2015 03:00 AM');
    var dif_time = motherfuckingreleasedate - todaysmotherfuckingdate;
    var days = Math.floor(dif_time / _day);

    switch (ii) {
      case 0:
        $('.js-key0').css({
          'left': -900 + (second.w * num1),
          'top': -500 + (second.h * num2)
        });
        $('.js-key1').css({
          'left': -nums.w * num2
        });
        $('.js-key2').css({
          'left': -nums.w * num1
        });
        break;
      case 1:
        $('.js-key3').css({
          'left': -numl.w * num2
        });
        $('.js-key4').css({
          'left': -numl.w * num1
        });
        break;
      case 2:
        $('.js-key5').css({
          'left': -numl.w * num2
        });
        $('.js-key6').css({
          'left': -numl.w * num1
        });
        break;
      case 3:
        $('.js-key7').css({
          'left': -numl.w * Math.floor(days / 10)
        });
        $('.js-key8').css({
          'left': -numl.w * num1
        });
        break;
    }
  }
};

var downer = function() {

  drawer();

  if (reloadnum == nowcount) {
    if (!reverse_flag) {
      getdate_flag = true;
      get_content();
    }
  } else if (dif_time <= 0 && sigertime <= 0) {
    init_flag = false;
    getdate_flag = true;
    $('.phantomcigar').css({
      'display': 'none'
    });
    //get_content();
  }

  nowcount++;
  dif_time--;

};

var countdown = function() {
  if (tid === null) {
    tid = setInterval(downer, intervaltime);
  }
};

get_content();

var animtime = 0;
var max_animtime = 11000;

var variable_interval = 1;
var variable_timer_id = null;
var old_time = 0;

var variable_cd = function() {

  if (old_time === 0) old_time = new Date() * 1;

  var now_time = new Date() * 1;

  animtime += now_time - old_time;
  old_time = now_time;

  var per = -Math.cos(2 * Math.PI / 2 * animtime / max_animtime) / 2 + 0.5;
  if (1 < per) per = 1;

  sigertime = Math.floor(per * 1140);
  drawer();
  variable_timer_id = setTimeout(variable_cd, variable_interval);
};

$('.phantomcigar').click(function() {

  if (!reverse_flag) {
    var over_flag = false;
    if (dif_time <= 1200) over_flag = true;

    var randnum = Math.floor(Math.random() * 10);

    var file = 'cigar.mp3';
    if (5 <= randnum) file = 'cigar2.mp3';
    console.log(file);
    if (over_flag) file = 'beep.mp3';

    (function initAudio() {
      var audio5js = new Audio5js({
        swf_path: 'http://www.konami.jp/mgs5/swf/audio5js.swf',
        ready: function() {
          this.load('http://gvgmaps.com/mgs5/_js/' + file);
          this.play();
        }
      });
      audioobj = audio5js;
    })();

    if (over_flag) return false;

    reverse_flag = true;

    old_time = 0;
    animtime = 0;
    variable_cd();

    $('.phantomcigar').css({
      'visibility': 'hidden'
    });
    $('#tpp.bg').addClass('cigar');

    setTimeout(function() {

      if (variable_timer_id !== null) {
        clearTimeout(variable_timer_id);
        variable_timer_id = null;
        sigertime = 0;
      }

      sigertime = 0;
      reverse_flag = false;
      getdate_flag = true;
      get_content();
      countdown();

      $('.base-').css({
        'display': 'block'
      });
      $('.animcls .number').css({
        'display': 'none'
      });

      setTimeout(function() {
        $('.animcls .number').css({
          'display': ''
        });
        $('.base-').css({
          'display': 'none'
        });
      }, 2000);

      setTimeout(function() {
        $('.phantomcigar').css({
          'visibility': ''
        });
        $('#tpp.bg').removeClass('cigar');
      }, 5000);

    }, 11000);
  }
});