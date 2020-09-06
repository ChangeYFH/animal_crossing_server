const Villagers=require('../app/model/villagersModel');

const data=[{"name":"阿判","sex":"男","race":"猫","character":"悠闲","birthday":"-1-1-","id":1,"imgUrl":"/static/villagers/001.png"},{"name":"蓬蓬","sex":"男","race":"小熊","character":"运动","birthday":"-1-2-","id":2,"imgUrl":"/static/villagers/002.png"},{"name":"李察","sex":"男","race":"鸭","character":"悠闲","birthday":"-1-3-","id":3,"imgUrl":"/static/villagers/003.png"},{"name":"倪家莉","sex":"女","race":"鹿","character":"成熟","birthday":"-1-4-","id":4,"imgUrl":"/static/villagers/004.png"},{"name":"企鹅达","sex":"男","race":"企鹅","character":"运动","birthday":"-1-5-","id":5,"imgUrl":"/static/villagers/005.png"},{"name":"巧蔻","sex":"女","race":"兔子","character":"元气","birthday":"-1-6-","id":6,"imgUrl":"/static/villagers/006.png"},{"name":"欧世豪","sex":"男","race":"河马","character":"运动-暴躁","birthday":"-1-7-","id":7,"imgUrl":"/static/villagers/007.png"},{"name":"谢博强","sex":"男","race":"老鹰","character":"运动","birthday":"-1-8-","id":8,"imgUrl":"/static/villagers/008.png"},{"name":"大头姐","sex":"女","race":"兔子","character":"成熟","birthday":"-1-9-","id":9,"imgUrl":"/static/villagers/009.png"},{"name":"小冈","sex":"男","race":"马","character":"悠闲","birthday":"-1-10-","id":10,"imgUrl":"/static/villagers/010.png"},{"name":"麻蓉","sex":"女","race":"狗","character":"元气","birthday":"-1-11-","id":11,"imgUrl":"/static/villagers/011.png"},{"name":"仁平","sex":"男","race":"猫","character":"悠闲","birthday":"-1-12-","id":12,"imgUrl":"/static/villagers/012.png"}];

for(let item of data){
  Villagers.create(item);
}

