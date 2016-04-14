document.addEventListener('DOMContentLoaded', init);

var towerSelected;
var diskSelected;
var counter = 0;

function init() {
  setWidth();
  $('.tower').click(towerClicked);
  $('#play').click(generateDisks);
}

function generateDisks(){
  var firstTower = $('#first > .piece-container');
  var secondTower = $('#second > .piece-container');
  var thirdTower = $('#third > .piece-container');
  var numOfDisks = $('#num').val();

  $('#second').css('background-color', 'black');

  firstTower.empty();
  secondTower.empty();
  thirdTower.empty();
  $('#highscore').text(Math.pow(2, numOfDisks) - 1 );

  for(var i = 0; i < numOfDisks; i++){
    var newDiv = $("<div class='disk' data-size='"+ (8-i) * 25 + "'></div>");
    newDiv.prependTo(firstTower);
  }
  setWidth();
}

function setWidth() {
  $('.disk').each(function(){
    width = $(this).data('size');
    $(this).width(width);
  })
}

function towerClicked() {
  if($('.selected').length){
    var towerToDrop = $(this).find(".piece-container");
    var diskToTest = towerToDrop.children().first();
    dropDisk(diskSelected, towerSelected, towerToDrop, diskToTest);
  } else {
    towerSelected = $(this).find(".piece-container");
    diskSelected = towerSelected.children().first();
    diskSelected.toggleClass('selected');
  }
}

function dropDisk(diskSelected, towerSelected, towerToDrop, diskToTest) {
  diskSelected.toggleClass('selected');
  var diskSize = diskSelected.data('size');
  var testSize = diskToTest.data('size');
  if(diskSize < testSize | testSize === undefined){
    diskSelected.prependTo(towerToDrop);
    counter ++;
    console.log(counter);
    $('#counter').text(counter);
  } else {
    towerToDrop.effect( "shake" );
  }
  checkWin();
}

function checkWin() {
  var firstTower = $('#first > .piece-container');
  var secondTower = $('#second > .piece-container');
  var thirdTower = $('#third > .piece-container');

  var firstTowerContent = firstTower.children();
  var secondTowerContent = secondTower.children();
  if(firstTowerContent.length === 0 && secondTowerContent.length === 0 ) {
    firstTower.empty();
    secondTower.empty();
    thirdTower.empty();

    $('#second').css('background-color', 'green');
    $('<p class="winner">YOU WON!</p>').appendTo(secondTower);
  }
}
