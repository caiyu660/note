import _ from "lodash";
import './index.css';
import './main.scss';

function Component() {
    var div = document.createElement('div');

    div.innerHTML = _.join(['hello','webpack'], ' ');
    div.className = 'hello';

    return div;
}

document.body.appendChild(Component());