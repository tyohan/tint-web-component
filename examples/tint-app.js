import TintComponent from '../src/tint-component.js';
import {render,html} from '../node_modules/lit-html/lit-html.js'; 
export class TintApp extends TintComponent {
    static get properties(){
        return {
            title:'Example of Component',
            content:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'
        }
    }
    
    render(){
        render(this.getTemplate(),this._shadowRoot);
    }

    getTemplate(){
        return html`
        <h1>${this.title}</h1>
        <article>${this.content}</article>
        `;
    }

    ready(){
        
    }
}
customElements.define('tint-app',TintApp);