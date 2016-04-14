document.addEventListener('DOMContentLoaded', init);

var towerSelected;
var diskSelected;

function init() {
  setWidth();
  $('.tower').click(towerClicked);
}

function setWidth() {
  $('.disk').each(function(){
    width = $(this).attr('size');
    $(this).width(width);
  })
}

function towerClicked() {
  if($('.selected').length){
    var towerToDrop = $(this);
    var diskToTest = towerToDrop.children().first();
    dropDisk(diskSelected, towerSelected, towerToDrop, diskToTest);
  } else {
    towerSelected = $(this);
    diskSelected = towerSelected.children().first();
    diskSelected.toggleClass('selected');
  }
}

function dropDisk(diskSelected, towerSelected, towerToDrop, diskToTest) {
  diskSelected.toggleClass('selected');
  var diskSize = diskSelected.attr('size');
  var testSize = diskToTest.attr('size');
  console.log("test:", testSize, "selected:", diskSize);
  if(diskSize < testSize | testSize === undefined){
    diskSelected.prependTo(towerToDrop);
  } else {
    towerToDrop.effect( "shake" );
  }
  checkWin();
}

function checkWin() {
  var firstTowerContent = $('#first').children();
  var secondTowerContent = $('#second').children();
  if(firstTowerContent.length === 0 && secondTowerContent.length === 0 ) {
    alert('you win!');
  }
}