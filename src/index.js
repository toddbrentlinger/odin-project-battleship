import './styles/meyerReset.scss';
import './styles/styles.scss';
import HeaderComponent from './components/headerComponent';
import GameboardComponent from './components/gameboardComponent';
import FooterComponent from './components/footerComponent';
import { createElement } from './utilities';
import Gameboard from './game/gameboard';

window.gameboard = Gameboard();
gameboard.init();

document.body.append(
    new HeaderComponent({
        title: 'Battleship'
    }).render(),
    createElement('main', {}, 
        (new GameboardComponent).render(),
        (new GameboardComponent).render()
    ),
    new FooterComponent({
        copyrightYear: 2023, 
        sourceCodeURL: 'https://github.com/toddbrentlinger/odin-project-battleship'
    }).render(),
);
