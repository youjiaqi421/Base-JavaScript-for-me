// webpack5工程脚手架入口文件
import './styles/main.css';

const app = document.getElementById('app');

app.innerHTML = `
  <div class="container">
    <h1>Webpack5 脚手架</h1>
    <p>这是一个基于Webpack5的前端工程化脚手架</p>
  </div>
`;

console.log('应用已成功启动！');   