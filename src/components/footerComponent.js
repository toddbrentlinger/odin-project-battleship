import BaseComponent from './baseComponent.js';
import { createElement } from '../utilities.js';

export default class FooterComponent extends BaseComponent {
    render() {
        const currYear = new Date().getFullYear();
        const {copyrightYear = currYear, sourceCodeURL} = this.props;

        this.initializeRender('footer');

        this.element.appendChild(
            createElement(
                'p',
                {},
                createElement(
                    'small',
                    {},
                    createElement('a', {href: sourceCodeURL, target: '_blank'}, 'Source Code'),
                    ' © ',
                    createElement('time', { id: 'copyright-year' }, currYear > copyrightYear ? `${copyrightYear}-${currYear}` : copyrightYear),
                    ' Todd Brentlinger, Santa Cruz, CA, USA. All Rights Reserved.'
                )
            )
        );

        return this.element;
    }
}
