const data = [
  { name: "questions", value: 17 },
  { name: "schools", value: 25 },
  { name: "philosophers", value: 35 },
];

const chartWidth = 480;
const chartHeight = 300;
const margin = 15;

const containerWidth = chartWidth + margin * 2; // 容器宽度
const containerHeight = chartHeight + margin * 2; // 容器高度

// 提取数据
const values = Array.from(data, (d) => {
  return d.value;
});
const names = Array.from(data, (d) => {
  return d.name;
});
const indices = Array.from(data, (_, i) => {
  return i;
});
console.log("names", names);

// 计算每一个条左下角的坐标
const setp = chartWidth / names.length; // 160
console.log("setp", setp);

const barWidth = setp * 0.8; // 128
const xs = Array.from(indices, (i) => i * setp); // [0, 0.8, 1.6]
console.log("xs", xs);
const y = chartHeight;

// 映射
const vmax = Math.max(...values);
const barHeights = Array.from(values, (v) => chartHeight * (v / vmax));

const nameColor = {
  questions: "#5B8FF9",
  philosophers: "#61DDAA",
  schools: "#65789B",
};

const colors = Array.from(names, (name) => nameColor[name]);

// 数据渲染
const canvas = document.getElementById("container-canvas");
canvas.style.width = containerWidth + "px";
canvas.style.height = containerHeight + "px";

// 下面把画布宽高设置为样式宽高的两倍主要是为了解决模糊问题
// 这个地方就不详细展开了，感兴趣的可以自行查阅
canvas.width = containerWidth * 2;
canvas.height = containerHeight * 2;

const context = canvas.getContext("2d");
context.scale(2, 2); // 抵消将画布宽高设置为样式宽高两倍的影响

context.translate(margin, margin); // 将坐标原点移动到绘制图表的区域

// context.fillStyle = "black";
// context.font = "25px PingFangSC-Regular, sans-serif"; // 设置文字的大小和字体
// context.fillText("hello world", 150, 100);

for (const index of indices) {
  console.log("aaa", index);
  // 将需要绘制的属性取出来
  const color = colors[index];
  const x = xs[index];
  const barHeight = barHeights[index];
  const value = values[index];
  // 绘制条
  context.fillStyle = color;
  console.log("11", x, y - barHeight, barWidth, barHeight);
  context.fillRect(x, y - barHeight, barWidth, barHeight);

  // 绘制值
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = "white";
  context.font = "25px PingFangSC-Regular, sans-serif";
  context.fillText(value, x + barWidth / 2, y - barHeight / 2);
}
