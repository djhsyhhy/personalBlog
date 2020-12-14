export function getNowDate() {
  var str = "";
  var weekList = ["日", "一", "二", "三", "四", "五", "六"];
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var week = date.getDay();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  month = month > 9 ? month : "0" + month;
  day = day > 9 ? day : "0" + day;
  seconds = seconds > 9 ? seconds : "0" + seconds;
  minutes = minutes > 9 ? minutes : "0" + minutes;
  hours = hours > 9 ? hours : "0" + hours;
  str += year + "年" + month + "月" + day + "日" + "星期" + weekList[week] + hours + ":" + minutes + ":" + seconds;
  return str;
}
export function imgTo64(img) {
  let canvas = document.createElement("canvas");
  let width = img.width;
  let height = img.height;

  if (width > height) {
    if (width > 100) {
      width = Math.round(width * 100 / height);
      height = 100
    }
  } else {
    if (height > 100) {
      height = Math.round(height * 100 / width);
      width = 100
    }
  }
  canvas.width = width; /*设置新的图片的宽度*/
  canvas.height = height; /*设置新的图片的长度*/
  let ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, width, height); /*绘图*/
  let dataURL = canvas.toDataURL("image/png", 0.8);
  // return dataURL.replace("data:image/png;base64,", "");
  return dataURL;
}