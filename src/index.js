import './styles/meyerReset.scss';
import './styles/styles.scss';
import HeaderComponent from './components/headerComponent';
import GameComponent from './components/gameComponent';
import FooterComponent from './components/footerComponent';

document.body.append(
    new HeaderComponent({
        title: 'Battleship'
    }).render(),
    new GameComponent().render(),
    new FooterComponent({
        copyrightYear: 2023, 
        sourceCodeURL: 'https://github.com/toddbrentlinger/odin-project-battleship'
    }).render(),
);

//GameLoopConsole.play();
