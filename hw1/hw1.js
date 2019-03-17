class Light {
  
  constructor(num) {
    this.element = document.createElement ('div');
    this.element.id = 'light' + num;
    
    this.element.style.cssText = "position:absolute; width:35px; height:35px; border-radius:30px; z-index:1"; 
    
    this.element.style.background = "hsl(249, 0%, 33%)";
    document.getElementsByTagName('body')[0].appendChild(this.element);
    
    this.timer = 0;
  }

	turnOn() {
    var self = this;
  	var hue = Math.random()*360;
  	self.element.style.background = "hsl(" + hue + ", 100%, 81%)";  
    self.timer = setTimeout (function() { self.turnOn() } , 1000);
  }
  
  turnOff() {
    var self = this;
    self.element.style.background = "hsl(249, 0%, 33%)";
    clearTimeout(self.timer);
    self.timer = 0;
  }
}

////////////////////////////////
var light;
var numOfLight = 55;

init();

function init() {
  light = new Array(numOfLight);
  for(var i = 0; i < numOfLight; i++) {
    light[i] = new Light(i);
  }
  
  //floor1
  light[0].element.style.top = '140px'; light[0].element.style.left = '278px';
  light[1].element.style.top = '150px'; light[1].element.style.left = '320px';
  //floor2
  light[2].element.style.top = '195px'; light[2].element.style.left = '220px';
  light[3].element.style.top = '208px'; light[3].element.style.left = '262px';
  light[4].element.style.top = '215px'; light[4].element.style.left = '304px';
  light[5].element.style.top = '220px'; light[5].element.style.left = '346px';
  light[6].element.style.top = '222px'; light[6].element.style.left = '388px';
  //floor3
  light[7].element.style.top = '280px'; light[7].element.style.left = '190px';
  light[8].element.style.top = '290px'; light[8].element.style.left = '232px';
  light[9].element.style.top = '296px'; light[9].element.style.left = '274px';
  light[10].element.style.top = '301px'; light[10].element.style.left = '316px';
  light[11].element.style.top = '307px'; light[11].element.style.left = '358px';
  light[12].element.style.top = '312px'; light[12].element.style.left = '400px';
  //floor4
  light[13].element.style.top = '350px'; light[13].element.style.left = '150px';
  light[14].element.style.top = '360px'; light[14].element.style.left = '192px';
  light[15].element.style.top = '369px'; light[15].element.style.left = '234px';
  light[16].element.style.top = '375px'; light[16].element.style.left = '276px';
  light[17].element.style.top = '383px'; light[17].element.style.left = '318px';
  light[18].element.style.top = '391px'; light[18].element.style.left = '360px';
  light[19].element.style.top = '395px'; light[19].element.style.left = '402px';
  light[20].element.style.top = '398px'; light[20].element.style.left = '444px';
  //floor 5
  light[21].element.style.top = '422px'; light[21].element.style.left = '115px';
  light[22].element.style.top = '437px'; light[22].element.style.left = '155px';
  light[23].element.style.top = '444px'; light[23].element.style.left = '197px';
  light[24].element.style.top = '454px'; light[24].element.style.left = '239px';
  light[25].element.style.top = '461px'; light[25].element.style.left = '281px';
  light[26].element.style.top = '468px'; light[26].element.style.left = '323px';
  light[27].element.style.top = '476px'; light[27].element.style.left = '365px';
  light[28].element.style.top = '482px'; light[28].element.style.left = '407px';
  light[29].element.style.top = '484px'; light[29].element.style.left = '449px';
  light[30].element.style.top = '486px'; light[30].element.style.left = '491px';
  //floor 6
  light[31].element.style.top = '495px'; light[31].element.style.left = '82px';
  light[32].element.style.top = '505px'; light[32].element.style.left = '124px';
  light[33].element.style.top = '514px'; light[33].element.style.left = '166px';
  light[34].element.style.top = '523px'; light[34].element.style.left = '208px';
  light[35].element.style.top = '532px'; light[35].element.style.left = '250px';
  light[36].element.style.top = '541px'; light[36].element.style.left = '292px';
  light[37].element.style.top = '548px'; light[37].element.style.left = '334px';
  light[38].element.style.top = '554px'; light[38].element.style.left = '376px';
  light[39].element.style.top = '560px'; light[39].element.style.left = '418px';
  light[40].element.style.top = '565px'; light[40].element.style.left = '460px';
  light[41].element.style.top = '568px'; light[41].element.style.left = '502px';
  light[42].element.style.top = '569px'; light[42].element.style.left = '544px';
  //floor7
  light[43].element.style.top = '550px'; light[43].element.style.left = '20px';
  light[44].element.style.top = '565px'; light[44].element.style.left = '62px';
  light[45].element.style.top = '575px'; light[45].element.style.left = '104px';
  light[46].element.style.top = '584px'; light[46].element.style.left = '146px';
  light[47].element.style.top = '593px'; light[47].element.style.left = '188px';
  light[48].element.style.top = '602px'; light[48].element.style.left = '230px';
  light[49].element.style.top = '610px'; light[49].element.style.left = '272px';
  light[50].element.style.top = '617px'; light[50].element.style.left = '314px';
  light[51].element.style.top = '623px'; light[51].element.style.left = '356px';
  light[52].element.style.top = '627px'; light[52].element.style.left = '398px';
  light[53].element.style.top = '630px'; light[53].element.style.left = '440px';
  light[54].element.style.top = '628px'; light[54].element.style.left = '482px';
  
}

$('#toggle').click(function() {
  var cur = document.getElementById("toggle").textContent
  if(cur == 'trun on') {
    $('#toggle').text('trun off');
    for(i = 0; i < numOfLight; i++) {
      light[i].turnOn();
    }
  }
  else {
    $('#toggle').text('trun on');
    for(i = 0; i < numOfLight; i++) {
      light[i].turnOff();
    }
  }
})